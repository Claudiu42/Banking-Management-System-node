const pool = require("../db/connect");

const getAllConturi = (req, res) => {
  pool.query(`SELECT cont.idcont, cont.idbanca, b.nume as banca, cont.idclient, c.nume, c.prenume, tip_cont, data_deschiderii, sold 
              FROM conturi_bancare cont
              JOIN banci b ON b.idbanca = cont.idbanca
              JOIN clienti c ON c.idclient = cont.idclient`, 
  (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.status(200).json(results);
  });
};

const createCont = (req, res) => {
  const { idbanca, idclient, tip_cont, data_deschiderii, sold } = req.body;

  if (!idbanca || !idclient ) {
    return res.status(400).json({
      error: "Fields idbanca and idclient are required",
    });
  }

  const today = new Date().toISOString().split('T')[0]; 
  const finalDate = data_deschiderii || today;
  const finalSold = sold || 0;

  pool.query(
    "INSERT INTO conturi_bancare (idbanca, idclient, tip_cont, data_deschiderii, sold ) VALUES (?, ?, ?, ?, ?)",
    [idbanca, idclient, tip_cont, finalDate, finalSold],
    (err) => {
      if (err) {
        return res.status(500).json({ err });
      }
      res.status(201).json({ message: "Account created successfully" });
    }
  );
};

const updateCont = (req, res) => {
  const { idcont } = req.params;
  const { idbanca, idclient, tip_cont, data_deschiderii, sold } = req.body;

  // Check if at least one field is provided for update
  if (!idbanca && !idclient && !tip_cont && !data_deschiderii && !sold) {
    return res.status(400).json({
      error: "At least one field must be provided for update (idbanca, idclient, tip_cont, data_deschiderii, sold)",
    });
  }

  // Build the SET clause dynamically
  let updateFields = [];
  let values = [];

  if (idbanca) {
    updateFields.push("idbanca = ?");
    values.push(idbanca);
  }
  if (idclient) {
    updateFields.push("idclient = ?");
    values.push(idclient);
  }
  if (tip_cont) {
    updateFields.push("tip_cont = ?");
    values.push(tip_cont);
  }
  if (data_deschiderii) {
    updateFields.push("data_deschiderii = ?");
    values.push(data_deschiderii);
  }
  if (sold) {
    updateFields.push("sold = ?");
    values.push(sold);
  }

  // Include the idcont at the end for the WHERE clause
  values.push(idcont);

  // Construct the final SQL query
  const query = `UPDATE conturi_bancare SET ${updateFields.join(", ")} WHERE idcont = ?`;

  // Execute the query
  pool.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "No account found for this client" });
    }
    res.status(200).json({ message: "Updated successfully" });
  });
};


const deleteCont = (req, res) => {
  const { idcont } = req.params;

  pool.query(
    "DELETE FROM conturi_bancare WHERE idcont = ?",
    [idcont],
    (err, results) => {
      if (err) {
        return res.status(500).json({ err });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "No account found for this client" });
      }
      res.status(200).json({ message: "Deleted successfully" });
    }
  );
};

module.exports = {
  getAllConturi,
  createCont,
  updateCont,
  deleteCont,
};
