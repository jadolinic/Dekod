import { useContext } from "react";
import Context from "../context/Context";

const Forma = () => {
  const { handleSubmit, formValues,formErrors, handleChange } = useContext(Context);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Unos zaposlenika</h1>
        <hr />
        <div className="field">
          <label>Ime</label>
          <input
            type="text"
            name="ime"
            value={formValues.ime}
            placeholder="Unesi ime"
            onChange={handleChange}

          />
          <p>{formErrors.ime}</p>
        </div>
        <div className="field">
          <label>Prezime</label>
          <input
            type="text"
            name="prezime"
            value={formValues.prezime}
            placeholder="Unesi prezime"
            onChange={handleChange}

          /><p>{formErrors.prezime}</p>
        </div>
        <div className="field">
          <label>Datum rođenja</label>
          <input
            type="date"
            name="datumRodenja"
            value={formValues.datumRodenja}
            placeholder="Odaberi datum rođenja"
            onChange={handleChange}

          /><p>{formErrors.datumRodenja}</p>
        </div>
        <div className="field">
          <label>Pozicija</label>
          <input
            type="text"
            name="pozicija"
            value={formValues.pozicija}
            onChange={handleChange}
            placeholder="Unesi poziciju"

          /><p>{formErrors.pozicija}</p>
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Forma;
