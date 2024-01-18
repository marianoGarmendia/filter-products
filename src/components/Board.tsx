import { ChangeEvent,   useEffect,   useState, useRef} from "react";
import { read , utils} from "xlsx";
import { filterIronBar } from "../filterProduct.js/ironBar";
import ButtonForm from "./Button-form";


type ElementoArray = string | number | string[] | number[] ;
export type ArrayInterno = ElementoArray[];

interface Props {
    setHeaders: React.Dispatch<React.SetStateAction<string[]>>;
    headers: string[];
    mostrar: boolean;
    setMostrar: React.Dispatch<React.SetStateAction<boolean>>;
}


function Board (props: Props) {
    const { setHeaders , headers, mostrar , setMostrar} = props
    const [ archivoSeleccionado, setArchivoSeleccionado] = useState<string>("")
    const [ productos , setProductos] = useState<Array<unknown>>([])
  const [ironBar, setIronBar] = useState<ArrayInterno>([]);
  const [wheyProtein , setWheyProtein] = useState<ArrayInterno>([]);
  const [lowCarb , setLowCarb] = useState<ArrayInterno>([]);

  const inputFileRef = useRef<HTMLInputElement>(null);
  

  const handleClearFile = () => {
    if (inputFileRef.current) {
      // Resetea el valor del input file y todo lo renderizado
      inputFileRef.current.value = '';
      setArchivoSeleccionado("")
      setIronBar([])
      setHeaders([])
      setMostrar(false)
      
    }
  };

    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const target = e.target.files ? e.target.files[0] : null
        const file = target?.arrayBuffer()
        
         file?.then(data => read(data))
         .then(res => {
            setArchivoSeleccionado(`archivo: ${res.SheetNames[0]} seleccionado`)
           return res.Sheets[res.SheetNames[0]]
        })
         .then(workSheet => utils.sheet_to_json(workSheet, {header: 1}))
         .then(responseData => {
            // filtro todo los arrays de productos
            const subarray = responseData.slice(5)
            setProductos(subarray)
            
            // Filtro las cabeceras de las columnas de datos 
            const response:string[] = responseData[4] as string[]
            const upHeaders = response.map(h =>{
                return h
            })
            upHeaders&&setHeaders(upHeaders)
            
        } )
        
    }
    
    useEffect(()=>{
    
        filterIronBar({productos},{setIronBar,setWheyProtein, setLowCarb},) 
        
    },[productos])
    
    
    


    return (  
        <div className="p-4 flex flex-col justify-center items-center max-w-screen-xl ">

            <input id="file-uno"  name="file-uno"  onChange={handleChange} type="file" ref={inputFileRef} placeholder="Ingresa tu tarea" className="opacity-0 "/>
            <label htmlFor="file-uno" className="flex items-center gap-2 rounded-md bg-slate-700 justify-center w-fit px-4 py-2 text-white hover:bg-slate-600 hover:scale-105 cursor-pointer transition-all">
            <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" fill="#eee"></path></svg>
            <span className="text-center">Seleccionar archivo</span>
            </label>
            {archivoSeleccionado &&    
            <div className="flex justify-center my-4">
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" className="mx-2" onClick={handleClearFile} version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M779.5 1002.7h-535c-64.3 0-116.5-52.3-116.5-116.5V170.7h768v715.5c0 64.2-52.3 116.5-116.5 116.5zM213.3 256v630.1c0 17.2 14 31.2 31.2 31.2h534.9c17.2 0 31.2-14 31.2-31.2V256H213.3z" fill="#475569" /><path d="M917.3 256H106.7C83.1 256 64 236.9 64 213.3s19.1-42.7 42.7-42.7h810.7c23.6 0 42.7 19.1 42.7 42.7S940.9 256 917.3 256zM618.7 128H405.3c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h213.3c23.6 0 42.7 19.1 42.7 42.7S642.2 128 618.7 128zM405.3 725.3c-23.6 0-42.7-19.1-42.7-42.7v-256c0-23.6 19.1-42.7 42.7-42.7S448 403 448 426.6v256c0 23.6-19.1 42.7-42.7 42.7zM618.7 725.3c-23.6 0-42.7-19.1-42.7-42.7v-256c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v256c-0.1 23.6-19.2 42.7-42.7 42.7z" fill="#4F46E5" /></svg>
                <p>{archivoSeleccionado}</p>
             </div>   }
            <ButtonForm></ButtonForm>
             
            {
                mostrar && 
                <table className="border border-black my-4 w-full
                 ">
            <thead>
                <tr>
                {headers && headers.map((h:string) => {
                    return <th key={h} className="p-2">{h === "Subtotal" ? "Precio de Venta x unid." : h === "Precio" ? "Costo" : h}</th>
                })}
                </tr>
            </thead>
            <tbody>
            {
                ironBar  &&  

                    ironBar.map((ir,i) => {
                        
                    return <tr  key={i} >
                            <td  className="p-2 border border-gray-950">{Array.isArray(ir) && ir[0]}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(ir) && ir[1]}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(ir) && ir[2]}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(ir) && "20 unid"}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(ir) && typeof ir[2] === "number" ? `$${ir[2] / 20 * 1.7}` : ""}</td>
                        </tr>
                    } )
                  
            }
            {
                wheyProtein && 
                wheyProtein.map((whey,i) => {
                        
                    return <tr  key={i} >
                            <td  className="p-2 border border-gray-950">{Array.isArray(whey) && whey[0]}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(whey) && whey[1]}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(whey) && typeof whey[2] === "number" ? Math.floor(whey[2]) : ""}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(whey) && "20 unid"}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(whey) && typeof whey[2] === "number" ? `$${Math.floor(whey[2] * 1.7)}` : ""}</td>
                        </tr>
                    } )
                
            }
             {
                lowCarb && 
                lowCarb.map((low,i) => {
                        
                    return <tr  key={i} >
                            <td  className="p-2 border border-gray-950">{Array.isArray(low) && low[0]}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(low) && low[1]}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(low) && low[2]}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(low) && "20 unid"}</td>
                            <td  className="p-2 border border-gray-950">{Array.isArray(low) && typeof low[2] === "number" ? `$${Math.floor(low[2] / 10 * 1.7)}` : ""}</td>
                        </tr>
                    } )
                
            }
            
        </tbody>
        </table>
            }
           
        </div>
        
            
        
    );
    }

export default Board ;