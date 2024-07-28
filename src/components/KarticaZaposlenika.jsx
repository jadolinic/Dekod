/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const KarticaZaposlenika = ({ zaposlenik }) => {
  return (
      <div className="kartica-zaposlenika">
        <img
          alt={`zaposlenik ${zaposlenik.firstName}`}
          src={`https://robohash.org/${zaposlenik.id}?set=set2`}
        />
        <h2>
          {zaposlenik.firstName} {zaposlenik.lastName}
        </h2>
        <p>{zaposlenik.jobTitle}</p>
      </div>
  );
};

export default KarticaZaposlenika;
