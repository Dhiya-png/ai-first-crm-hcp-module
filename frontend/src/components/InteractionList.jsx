import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedInteraction } from "../store/interactionSlice";
import api from "../services/api";

function InteractionList() {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/interactions/");
      setInteractions(res.data);
    } catch (err) {
      console.log("Error fetching interactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteInteraction = async (id) => {
    const confirmed = window.confirm(
      "Delete this interaction? This can't be undone."
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await api.delete(`/interactions/${id}`);
      fetchInteractions();
    } catch (err) {
      console.log("Error deleting interaction:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-header__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h.01M3 6h.01M3 18h.01M8 6h13M8 12h13M8 18h13" />
          </svg>
        </div>
        <div className="section-header__text">
          <span className="eyebrow">Records</span>
          <h2>Interaction History</h2>
        </div>
      </div>

      {loading ? (
        <div className="loading-row">
          <span className="spinner" />
          Loading interactions…
        </div>
      ) : interactions.length === 0 ? (
        <div className="empty-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6" />
            <path d="M3 8h18" />
            <path d="M17 14v6M14 17h6" />
          </svg>
          <strong>No interactions yet</strong>
          <span>Interactions you log will show up here.</span>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>HCP</th>
                <th>Discussion</th>
                <th>Products</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {interactions.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <span className="badge">HCP #{item.hcp_id}</span>
                  </td>
                  <td className="cell-discussion" title={item.discussion}>
                    {item.discussion}
                  </td>
                  <td>
                    <div className="tag-list">
                      {item.products
                        ? item.products
                            .split(",")
                            .map((p) => p.trim())
                            .filter(Boolean)
                            .map((p, i) => (
                              <span className="tag" key={i}>{p}</span>
                            ))
                        : "—"}
                    </div>
                  </td>
                  <td>{formatDate(item.interaction_date)}</td>

                  <td>
                    <div className="actions-cell">
                      <button
                        className="btn-icon"
                        title="Edit interaction"
                        onClick={() => dispatch(setSelectedInteraction(item))}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </button>

                      <button
                        className="btn-icon btn-icon--danger"
                        title="Delete interaction"
                        disabled={deletingId === item.id}
                        onClick={() => deleteInteraction(item.id)}
                      >
                        {deletingId === item.id ? (
                          <span className="spinner" />
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InteractionList;