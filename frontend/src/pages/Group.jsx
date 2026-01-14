import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

export default function Group() {
  const { id } = useParams();
  const [balances, setBalances] = useState({});

  useEffect(() => {
    api.get(`/api/expenses/balances/${id}`)
      .then(res => setBalances(res.data));
  }, [id]);

  return (
    <div className="card">
      <h2>Balances</h2>
      {Object.entries(balances).map(([user, amount]) => (
        <p key={user}>{user}: {amount}</p>
      ))}
    </div>
  );
}
