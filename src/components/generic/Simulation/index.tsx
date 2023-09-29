import Button from "../../universal/Button";
import styles from "./simulation.module.scss";
import {useState} from 'react';

const Simulation = ({type,modelDetails}:any) =>{
    const [modelType,setModelType] = useState('MA');
    const [selectedModels,setSelectedModels] = useState<string[]>([]);

    const toggleModelSelection = (model:string) =>{
        let index = selectedModels.findIndex((item:any)=>item === model)
        if(index > -1){
            let arr = selectedModels.splice(index,1)
            setSelectedModels([...arr])
        }else{
            setSelectedModels([...selectedModels,model])
        }
    }

    const compareModel = () =>{

    }

    return (
        <div className={styles["simulationMainContainer"]}>
            <div className={styles["toggleContainer"]}>
                    <div className={modelType == 'MA' ? styles['active'] : styles['inactive']} onClick={()=>{setModelType('MA')}}>
                        <p>Model Analysis</p>
                    </div>
                    <div className={modelType == 'MC' ? styles['active'] : styles['inactive']} onClick={()=>{setModelType('MC')}}>
                        <p>Model Comparison</p>
                    </div>
            </div>
            <div className={styles["selectionContainer"]}>
                  <div><h4>Select Model</h4></div>
                  <div className={styles["horizontalAlign"]}>
                    {modelDetails.map((item:any,index:number)=>{
                       return <div key={index} className={styles["checkBoxDiv"]}>
                            <input type="checkbox" onChange={()=>toggleModelSelection(item)}/>
                            <p>{item}</p>
                       </div>
                    })}
                    {modelType == 'MC' &&  <Button variant="primary" className={styles["buttonPrimary"]} onClick={()=>compareModel()}>
                        <div>Compare</div>
                    </Button>}
                  </div>
            </div>
        </div>
    )

}

export default Simulation;