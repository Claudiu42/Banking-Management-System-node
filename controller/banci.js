const pool = require("../db/connect");

const getAllBanci = (req, res) => {
  pool.query("SELECT * FROM banci", (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.status(200).json(results);
  });
};

const createBanca = (req, res) => {
  const { nume, adresa, telefon, tip_banca } = req.body;

  if (!nume || !adresa || !telefon || !tip_banca) {
    return res.status(400).json({
      error: "All fields are required (nume, adresa, telefon, tip_banca)",
    });
  }

  pool.query(
    "INSERT INTO banci (nume, adresa, telefon, tip_banca) VALUES (?, ?, ?, ?)",
    [nume, adresa, telefon, tip_banca],
    (err) => {
      if (err) {
        return res.status(500).json({ err });
      }
      res.status(201).json({ message: "Bank created" });
    }
  );
};

const updateBanca = (req, res) => {
  const { id } = req.params;
  const { nume, adresa, telefon, tip_banca } = req.body;

  const fieldsToUpdate = [];
  const valuesToUpdate = [];

  if (nume) {
    fieldsToUpdate.push("nume = ?");
    valuesToUpdate.push(nume);
  }
  if (adresa) {
    fieldsToUpdate.push("adresa = ?");
    valuesToUpdate.push(adresa);
  }
  if (telefon) {
    fieldsToUpdate.push("telefon = ?");
    valuesToUpdate.push(telefon);
  }
  if (tip_banca) {
    fieldsToUpdate.push("tip_banca = ?");
    valuesToUpdate.push(tip_banca);
  }

  if (fieldsToUpdate.length === 0) {
    return res
      .status(400)
      .json({ error: "At least one field must be provided for update" });
  }

  valuesToUpdate.push(id);

  const query = `UPDATE banci SET ${fieldsToUpdate.join(
    ", "
  )} WHERE idbanca = ?`;

  pool.query(query, valuesToUpdate, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Bank not found" });
    }
    res.status(200).json({ message: "Bank updated successfully" });
  });
};

const deleteBanca = (req, res) => {
  const { id } = req.params;

  pool.query(
    "DELETE FROM banci WHERE idbanca = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ err });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Bank not found" });
      }
      res.status(200).json({ message: "Bank deleted successfully" });
    }
  );
};

module.exports = {
  getAllBanci,
  createBanca,
  updateBanca,
  deleteBanca,
};
