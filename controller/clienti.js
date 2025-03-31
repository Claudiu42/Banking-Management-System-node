const pool = require("../db/connect");

const getAllClienti = (req, res) => {
  pool.query("SELECT * FROM clienti", (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.status(200).json(results);
  });
};

const createClient = (req, res) => {
  const { nume, prenume, adresa, telefon, tip_client } = req.body;

  if (!nume || !prenume || !adresa || !telefon || !tip_client) {
    return res.status(400).json({
      error:
        "All fields are required (nume, prenume, adresa, telefon, tip_client)",
    });
  }

  pool.query(
    "INSERT INTO clienti (nume, prenume, adresa, telefon, tip_client) VALUES (?, ?, ?, ?, ?)",
    [nume, prenume, adresa, telefon, tip_client],
    (err) => {
      if (err) {
        return res.status(500).json({ err });
      }
      res.status(201).json({ message: "Client created" });
    }
  );
};

const updateClient = (req, res) => {
  const { id } = req.params;
  const { nume, prenume, adresa, telefon, tip_client } = req.body;

  const fieldsToUpdate = [];
  const valuesToUpdate = [];

  if (nume) {
    fieldsToUpdate.push("nume = ?");
    valuesToUpdate.push(nume);
  }
  if (prenume) {
    fieldsToUpdate.push("prenume = ?");
    valuesToUpdate.push(prenume);
  }
  if (adresa) {
    fieldsToUpdate.push("adresa = ?");
    valuesToUpdate.push(adresa);
  }
  if (telefon) {
    fieldsToUpdate.push("telefon = ?");
    valuesToUpdate.push(telefon);
  }
  if (tip_client) {
    fieldsToUpdate.push("tip_client = ?");
    valuesToUpdate.push(tip_client);
  }

  if (fieldsToUpdate.length === 0) {
    return res
      .status(400)
      .json({ error: "At least one field must be provided for update" });
  }

  valuesToUpdate.push(id);

  const query = `UPDATE clienti SET ${fieldsToUpdate.join(
    ", "
  )} WHERE idclient = ?`;

  pool.query(query, valuesToUpdate, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json({ message: "Client updated successfully" });
  });
};

const deleteClient = (req, res) => {
  const { id } = req.params;

  pool.query(
    "DELETE FROM clienti WHERE idclient = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ err });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.status(200).json({ message: "Client deleted successfully" });
    }
  );
};

module.exports = {
  getAllClienti,
  createClient,
  updateClient,
  deleteClient,
};
