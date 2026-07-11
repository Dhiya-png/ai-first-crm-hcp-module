from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.hcp import HCP
from app.schemas.hcp import HCPCreate, HCPResponse

router = APIRouter(
    prefix="/hcps",
    tags=["HCP"]
)

# create hcp
@router.post("/", response_model=HCPResponse)
def create_hcp(hcp: HCPCreate, db: Session = Depends(get_db)):
    db_hcp = HCP(**hcp.model_dump())
    db.add(db_hcp)
    db.commit()
    db.refresh(db_hcp)
    return db_hcp

# get all hcp
@router.get("/", response_model=list[HCPResponse])
def get_hcps(db: Session = Depends(get_db)):
    return db.query(HCP).all()

# get single hcp
@router.get("/{hcp_id}", response_model=HCPResponse)
def get_hcp(hcp_id: int, db: Session = Depends(get_db)):
    hcp = db.query(HCP).filter(HCP.id == hcp_id).first()

    if not hcp:
        raise HTTPException(status_code=404,
                            detail="HCP not found")

    return hcp