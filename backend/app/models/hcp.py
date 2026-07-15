from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base


class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    specialization = Column(String)
    hospital = Column(String)
    email = Column(String)
    phone = Column(String)

    interactions = relationship(
        "Interaction",
        back_populates="hcp"
    )