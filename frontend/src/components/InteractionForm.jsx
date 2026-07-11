import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedInteraction } from "../store/interactionSlice";
import api from "../services/api";

const emptyForm = {
  hcp_id: "",
  discussion: "",
  products: "",
  interaction_date: "",
};

function InteractionForm() {
  const dispatch = useDispatch();

  const selectedInteraction = useSelector(
    (state) => state.interaction.selectedInteraction
  );

  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedInteraction) {
      setFormData({
        hcp_id: selectedInteraction.hcp_id,
        discussion: selectedInteraction.discussion,
        products: selectedInteraction.products,
        interaction_date: selectedInteraction.interaction_date,
      });
    }
  }, [selectedInteraction]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    dispatch(clearSelectedInteraction());
  };

  const saveInteraction = async () => {
    setSaving(true);
    try {
      if (selectedInteraction) {
        await api.put(`/interactions/${selectedInteraction.id}`, formData);
        alert("Interaction Updated");
      } else {
        await api.post("/interactions/", formData);
        alert("Interaction Saved");
      }

      resetForm();
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-header__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div className="section-header__text">
          <span className="eyebrow">
            {selectedInteraction ? "Editing" : "New entry"}
          </span>
          <h2>Structured Form</h2>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="hcp_id">Doctor ID</label>
          <input
            id="hcp_id"
            name="hcp_id"
            placeholder="e.g. 10245"
            value={formData.hcp_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="interaction_date">Date</label>
          <input
            id="interaction_date"
            type="date"
            name="interaction_date"
            value={formData.interaction_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group form-group--full">
          <label htmlFor="products">Products</label>
          <input
            id="products"
            name="products"
            placeholder="e.g. Amoxil, Zestril"
            value={formData.products}
            onChange={handleChange}
          />
        </div>

        <div className="form-group form-group--full">
          <label htmlFor="discussion">Discussion</label>
          <textarea
            id="discussion"
            name="discussion"
            placeholder="What was discussed during this interaction?"
            value={formData.discussion}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button
          className="btn btn-primary"
          onClick={saveInteraction}
          disabled={saving}
        >
          {saving && <span className="spinner spinner--light" />}
          {selectedInteraction ? "Update Interaction" : "Save Interaction"}
        </button>

        {selectedInteraction && (
          <button className="btn btn-secondary" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default InteractionForm;