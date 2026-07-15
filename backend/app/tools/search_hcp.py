from langchain.tools import tool
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.hcp import HCP


@tool
def search_hcp(doctor_name: str):
    """
    Search Healthcare Professional (HCP) by doctor name.
    """

    db: Session = SessionLocal()

    try:
        doctor = (
            db.query(HCP)
            .filter(HCP.name.ilike(f"%{doctor_name}%"))
            .first()
        )

        if doctor:
            return {
                "hcp_id": doctor.id,
                "doctor_name": doctor.name,
                "specialization": doctor.specialization,
                "hospital": doctor.hospital,
                "status": "HCP found"
            }

        return {
            "status": "Not Found",
            "message": f"No doctor found with name '{doctor_name}'."
        }

    finally:
        db.close()