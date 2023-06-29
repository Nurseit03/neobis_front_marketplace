import React, { useState, useEffect } from 'react';
import axios from "../../js/api/axios.js";

const ResendTimer = ({phoneNumber, setIsCodeTrue}) => {
  const [time, setTime] = useState(59);
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      setIsTimerFinished(true);
    }
  }, [time]);

  const formatTime = (time) => {
    const seconds = time.toString().padStart(2, '0');
    return `00:${seconds}`;
  };

  const sendVerificationCode = async (phoneNumber) => {
      setIsCodeTrue(true);
    try {
        const response =  await axios.put("/send_verification_code/",{
          phone_number: phoneNumber
        });
  
        if (!(response.status === 201 || response.status === 200)) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        
        console.log(response);
        return response;
      } catch (error) {
        console.log("Error:", error);
      }

    setTime(59);
    setIsTimerFinished(false);
  };

  return (
    <>
      {isTimerFinished ? (<button className="modal__repeat__code__button" type="button" onClick={() => sendVerificationCode(phoneNumber)}>Отправить еще раз</button>)
       : (
       <div className="repeatSendCodeTimer">
          <p>Повторный запрос</p>
          <p>{formatTime(time)}</p>
        </div>
      )}
    </>
  );
};

export default ResendTimer;
