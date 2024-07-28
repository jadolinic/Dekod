/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";

const Context = createContext();

export const EmployeeProvider = ({ children }) => {
  const [zaposlenici, setZaposlenici] = useState([]);
  const [error, setError] = useState(null);

  const [searchPoljeFirstName, setSearchPoljeFirstName] = useState("");
  const [searchPoljeJobTitle, setSearchPoljeJobTitle] = useState("");
  const [filter, setFilter] = useState(zaposlenici);

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  const [sortCondition, setSortCondition] = useState("");

  const pocetneVrijednosti = {
    ime: "",
    prezime: "",
    pozicija: "",
    datumRodenja: "",
  };
  const [formValues, setFormValues] = useState(pocetneVrijednosti);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchEmployees = () => {
      fetch("api/paganini/api/job-interview/employees", {
        method: "GET",
        headers: {
          Authorization: "",
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Greška prilikom dohvata podataka: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setZaposlenici(data.data);
        })
        .catch(error => {
          setError(error.message);
        });
    };
  
    fetchEmployees();
  }, []);
  

  useEffect(() => {
    let filterZaposlenika = zaposlenici.filter((zaposlenik) => {
      const firstName =
        zaposlenik.firstName &&
        zaposlenik.firstName.toLowerCase().includes(searchPoljeFirstName);
      const jobTitle =
        zaposlenik.jobTitle &&
        zaposlenik.jobTitle.toLowerCase().includes(searchPoljeJobTitle);

      return firstName && jobTitle;
    });

    if (sortCondition === "firstName") {
      filterZaposlenika = filterZaposlenika.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortCondition === "jobTitle") {
      filterZaposlenika = filterZaposlenika.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
    }


    setFilter(filterZaposlenika);
    setCurrentPage(1);
  }, [zaposlenici, searchPoljeFirstName, searchPoljeJobTitle, sortCondition]);

  const filterChangeZaposlenika = (e) => {
    const searchCurrentPolje = e.target.value.toLowerCase();
    setSearchPoljeFirstName(searchCurrentPolje);
  };

  const filterChangePozicija = (e) => {
    const searchCurrentPolje = e.target.value.toLowerCase();
    setSearchPoljeJobTitle(searchCurrentPolje);
  };

  const handleSortChange = (e) => {
    setSortCondition(e.target.value)
  }

  const validate = (v) => {
    const errors = {};
    if (!v.ime) {
      errors.ime = "Ime nije upisano";
    }
    if (!v.prezime) {
      errors.prezime = "Prezime nije upisano";
    }
    if (!v.datumRodenja) {
      errors.datumRodenja = "Datum rođenja nije upisan";
    }
    if (!v.pozicija) {
      errors.pozicija = "Pozicija nije upisana";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(formValues);
      setFormValues(pocetneVrijednosti);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Context.Provider
      value={{
        zaposlenici,
        error,
        handleSubmit,
        handleChange,
        formValues,
        formErrors,
        filterChangeZaposlenika,
        filterChangePozicija,
        filter,
        currentPage,
        setCurrentPage,
        employeesPerPage,
        handleSortChange
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
