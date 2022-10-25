import React, { useState, useEffect, useReducer, useMemo, useRef } from 'react';

const initialState = {
  favorites: []
}

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    default:
      return state;
  }
}



const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search,setSearch] = useState('');
  const searchInput = useRef(null);
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results));
  }, []);

  const handleClick = favorite => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  }

  // const handleSearch = (event) =>{
  //   setSearch(event.target.value)
  // }

  const handleSearch = () =>{
    setSearch(searchInput.current.value);
  }
  // const filteredUsers = characters.filter((user)=>{
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // })


  const filteredUsers =  useMemo(() =>
    characters.filter((user)=>{
      return user.name.toLowerCase().includes(search.toLowerCase())
   }),
   [characters,search]
  )


  return (
    <div className="Characters">

      {favorites.favorites.map(favorite => (
        <li key={favorite.id}>
          {favorite.name}
        </li>
      ))}

      <div className='Search'>
        <input type= "text" value= {search} ref={searchInput} onChange={handleSearch}/>
      </div>

      {filteredUsers.map(character => (
        <div className="item" key={character.id}>
          <h2>{character.name}</h2>
          <button type="button" onClick={() => handleClick(character)}>Agregar a Favoritos</button>
        </div>
      ))}
    </div>
  );
}

export default Characters;

/* Super complicado pero lo vas a usar muchisimas veces
1. agrega el useReducer
2. crea un estado inicial: la lista de favoritos vacia
3. crea el reducer, es una funcion que usa switch identificar el metodo a usar
	  recive state y action:
		state: el estado actual.
		action: objeto con el metodo que quieres ejecutar junto con el contenido.
		action.type: el metodo a ejecutar.
		action.payload: el contenido nuevo que quieres manejar.
		Ej: ADD_TO_FAVORITE toma el estado actual y le agrega el contenido de payload
4. crea el use reducer:
		favorite: es el nombre el valor de lectura.
		dispatch: el nombre de la funcion para llamar a los metodos.
		useReducer toma dos datos, el primero es el reducer, contenedor del switch de metodos
		el segundo parametro es el estado inicial, que por lo regular es vacio
5. Metodo que llama al dispatch / la funcion para acceder a un metodo del reducer
		contiene el type que es el nombre del metodo
		y el payload que es el contenido que se manejara al correr el metodo
		el contenido del payload en este caso se obtiene del tag que lo llamo con el onclick
6. Onclick que manda a llamar al dispatch
		es un onclick que al ejecutarse manda la data del caracter
		en la funcion esta info sera mandada al reducer y de ahi al state final en favorite
7. map al contenido de favorite, listado del contenido de este array, 
		si no hay pues no se ve nada
*/