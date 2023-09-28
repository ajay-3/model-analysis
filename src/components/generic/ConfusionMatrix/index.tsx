import React from "react";

const ConfusionMatrix = (props: any) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${props.className}`}
    >
      <div className="text-2xl font-poppins font-medium text-navy-blue">
        Confusion Matrix
      </div>
      <div className="text-sm font-poppins font-medium  text-navy-blue">
        Predicted Class
      </div>
      <div className="flex flex-row  justify-center items-center">
        <div className="vertical-heading">
          <span className="inline-block  w-24 -ml-14 -mt-4 absolute transform -rotate-90 text-sm font-poppins font-medium text-navy-blue">
            Actual Class
          </span>
        </div>
        <div>
          {props.matrix.map((row: any, index: any) => {
            return (
              <div key={index} className="flex flex-row">
                {Object.entries(row).map((key: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row justify-start bg-custom-white m-2 w-40 h-12 rounded"
                    >
                      <span className="bg-navy-blue text-custom-white font-orbitron h-8 px-2 pt-1 rounded">
                        {key[0]}
                      </span>
                      <span className="text-navy-blue font-orbitron m-auto p-2 text-2xl font-medium">
                        {key[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;
