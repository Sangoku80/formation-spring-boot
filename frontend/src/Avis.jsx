import { useEffect, useState } from "react";

function Avis() {
  const [avis, setAvis] = useState([]);
  const search = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sentiment");
      const data = await response.json();
      setAvis(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
        <pre>{JSON.stringify(avis, null, avis)}</pre>
    </div>
  )
  
}

export default Avis;

