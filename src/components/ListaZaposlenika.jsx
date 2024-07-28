import { useContext } from "react";
import Context from "../context/Context";
import KarticaZaposlenika from "./KarticaZaposlenika";

const ListaZaposlenika = () => {
  const {
    filterChangeZaposlenika,
    filter,
    filterChangePozicija,
    currentPage,
    setCurrentPage,
    employeesPerPage,
    handleSortChange
  } = useContext(Context);

  /* Paginacija prvih 10 */

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filter.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filter.length / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <h1>Zaposlenici</h1>
      <div className="pretrazivaci">
        <div className="ime-zaposlenika">
          <label>Pretraži po imenu</label>
          <input
            type="search"
            placeholder="Pretraži zaposlenika"
            onChange={filterChangeZaposlenika}
          />
        </div>
        <div className="pozicija-zaposlenika">
          <label>Pretraži po poziciji</label>
          <input
            type="search"
            placeholder="Pretraži poziciju"
            onChange={filterChangePozicija}
          />
        </div>
        <div className="sortiranje">
        <label>Sortiraj</label>
        <select onChange={handleSortChange}>
          <option value="">-- Odaberi --</option>
          <option value="firstName">Ime</option>
          <option value="jobTitle">Pozicija</option>
        </select>
      </div>
      </div>

    

      <div className="lista-zaposlenika">
        {currentEmployees.map((zaposlenik) => {
          return (
            <KarticaZaposlenika key={zaposlenik.id} zaposlenik={zaposlenik} />
          );
        })}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </>
  );
};

export default ListaZaposlenika;
