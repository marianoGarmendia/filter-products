import { ArrayInterno } from "../components/Board";

interface Product {
  productos: unknown[] | undefined;
}

export interface Response {
  setIronBar: React.Dispatch<React.SetStateAction<ArrayInterno>>;
  setWheyProtein: React.Dispatch<React.SetStateAction<ArrayInterno>>;
  setLowCarb: React.Dispatch<React.SetStateAction<ArrayInterno>>;
}

export const filterIronBar = (
  { productos }: Product,
  { setIronBar, setWheyProtein, setLowCarb }: Response
) => {
  if (productos !== undefined) {
    for (const subArray of productos) {
      if (Array.isArray(subArray)) {
        subArray.filter((prod) => {
          if (typeof prod === "string") {
            if (prod.includes("Iron Bar")) {
              setIronBar((prevIron) => [...(prevIron ?? []), subArray]);
            }
            if (prod.includes("Whey 3")) {
              setWheyProtein((prevWhey) => [...prevWhey, subArray]);
            }
            if (prod.includes("Low Carb")) {
              setLowCarb((prevLowCarb) => [...prevLowCarb, subArray]);
            }
          }
        });
      }
    }
  }
};
