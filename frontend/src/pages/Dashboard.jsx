import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api.get("/api/groups").then(res => setGroups(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Your Groups</h2>
      {groups.map(g => (
        <button key={g._id} onClick={() => nav(`/group/${g._id}`)}>
          {g.name}
        </button>
      ))}
    </div>
  );
}
