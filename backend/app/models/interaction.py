from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from app.database import Base

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    hcp_id = Column(Integer, ForeignKey("hcps.id"))
    interaction_date = Column(Date)
    discussion = Column(Text)
    products = Column(String)
    summary = Column(Text)
    follow_up_date = Column(Date)