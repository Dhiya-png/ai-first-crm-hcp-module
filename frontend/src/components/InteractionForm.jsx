import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearSelectedInteraction,
  clearAIInteraction,
} from "../store/interactionSlice";
import api from "../services/api";

const emptyForm = {
  hcp_id: "",
  doctor_name: "",
  discussion: "",
  products: "",
  interaction_date: new Date().toISOString().split("T")[0],
};

function InteractionForm() {
  const dispatch = useDispatch();

  const selectedInteraction = useSelector(
    (state) => state.interaction.selectedInteraction
  );

  const aiInteraction = useSelector(
    (state) => state.interaction.aiInteraction
  );

  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const data = aiInteraction || selectedInteraction;

    if (data) {
      setFormData({
        hcp_id: data.hcp_id || "",
        doctor_name: data.doctor_name || "",
        discussion: data.discussion || "",
        products: data.products || "",
        interaction_date:
          data.interaction_date ||
          new Date().toISOString().split("T")[0],
      });
    } else {
      setFormData(emptyForm);
    }
  }, [selectedInteraction, aiInteraction]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);

    dispatch(clearSelectedInteraction());
    dispatch(clearAIInteraction());
  };

  const saveInteraction = async () => {
    if (!formData.hcp_id) {
      alert("Please select a valid HCP.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        hcp_id: formData.hcp_id,
        discussion: formData.discussion,
        products: formData.products,
        interaction_date: formData.interaction_date,
      };

      if (selectedInteraction?.id) {
        await api.put(
          `/interactions/${selectedInteraction.id}`,
          payload
        );

        alert("Interaction Updated");
      } else {
        await api.post("/interactions/", payload);

        alert("Interaction Saved");
      }

      resetForm();
    } catch (err) {
      console.log(err);
      alert("Unable to save interaction.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <span className="eyebrow">
            {selectedInteraction ? "Editing" : "New Entry"}
          </span>

          <h3>Structured Form</h3>
        </div>
      </div>

      <div className="form-grid">

        <div className="form-group">
          <label>Doctor Name</label>

          <input
            name="doctor_name"
            value={formData.doctor_name}
            readOnly
            placeholder="Filled by AI Assistant"
          />
        </div>

        <div className="form-group">
          <label>Doctor ID</label>

          <input
            name="hcp_id"
            value={formData.hcp_id}
            readOnly
            placeholder="Filled by AI"
          />
        </div>

        <div className="form-group">
          <label>Interaction Date</label>

          <input
            type="date"
            name="interaction_date"
            value={formData.interaction_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group form-group--full">
          <label>Products Discussed</label>

          <input
            name="products"
            value={formData.products}
            onChange={handleChange}
          />
        </div>

        <div className="form-group form-group--full">
          <label>Discussion</label>

          <textarea
            rows="5"
            name="discussion"
            value={formData.discussion}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="form-actions">

        <button
          className="btn btn-primary"
          onClick={saveInteraction}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : selectedInteraction?.id
            ? "Update Interaction"
            : "Save Interaction"}
        </button>

        {(selectedInteraction || aiInteraction) && (
          <button
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Clear
          </button>
        )}

      </div>
    </div>
  );
}

export default InteractionForm;