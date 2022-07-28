import { useEffect, useState } from "react";

export const TweetDetails = () => {
  const [detailsState, setDetailsState] = useState(null);

  useEffect(()=>{
  fetch('/api/me/home-feed')
  .then((res)=>res.json())
  .then((data)=>{setDetailsState(data)
  }, []
  )})
    
  return <div>TweetDetails</div>;
  };
