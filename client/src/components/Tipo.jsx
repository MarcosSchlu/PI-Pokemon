/* import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTipos } from "./../actions/index";

export default function Tipoo() {
  const dispatch = useDispatch();
  const allTipos = useSelector((state) => state.tipos);

  useEffect(() => {
    console.log("Buscando tipos....");
    dispatch(getTipos());
  }, [dispatch]);

  { if(allTipos) {
    allTipos?.map((tipo) => {
      return <option value={tipo.name}>{tipo.name}</option>;
    });
  } 

  }
}
 */