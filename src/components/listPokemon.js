import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function ListPokemon() {
  const [pokeimg, setPokeimg] = useState([
    {
      pokemon: null,
      img: null,
    },
  ]);
  const [pokeItem, setPokeItem] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function listFetch() {
      setLoading(true);
      fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964")
        .then((resp) => resp.json())
        .then((resp) => {
          resp.results.map((poke) => {
            fetch(poke.url)
              .then((resp1) => resp1.json())
              .then(async (resp1) => {
                await fetch(resp1.forms[0].url)
                  .then((resp2) => resp2.json())
                  .then((resp2) => {
                    if (resp2.sprites.front_default !== null) {
                      setPokeimg((oldpokeimg) => [
                        ...oldpokeimg,
                        {
                          pokemon: resp1.forms[0].name.toUpperCase(),
                          img: resp2.sprites.front_default,
                        },
                      ]);
                    }
                  });
                setPokeItem(1);
                return setLoading(false);
              });
          });
        });
    }

    listFetch();
  }, []);

  function left() {
    setPokeItem((oldpokemonitem) => oldpokemonitem - 1);
    if (pokeItem === 1) {
      setPokeItem(1);
    }
  }

  function rigth() {
    setPokeItem((oldpokemonitem) => oldpokemonitem + 1);
  }

  if (loading) {
    return (
      <div className="imgLoading">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
          alt=""
          width="100"
          height="100"
        />
      </div>
    );
  } else {
    return (
      <div className="pokeform">
        <button onClick={left}>
          <FaAngleLeft size={30} />
        </button>
        <div className="card">
          <img src={pokeimg[pokeItem].img} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{pokeimg[pokeItem].pokemon}</h5>
          </div>
        </div>
        <button onClick={rigth}>
          <FaAngleRight size={30} />
        </button>
      </div>
    );
  }
}

export default ListPokemon;
