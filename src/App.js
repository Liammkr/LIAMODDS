import React, { useEffect } from "react";
import { Toaster, toast } from "sonner";

function App() {
  useEffect(() => {
    const handleClick = () => {
      toast.success("Successfully Subscribed");
    };

    const subscribeButton = document.getElementById("subscribe");
    if (subscribeButton) {
      subscribeButton.addEventListener("click", handleClick);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (subscribeButton) {
        subscribeButton.removeEventListener("click", handleClick);
      }
    };
  }, []); // Empty dependency array means this effect runs only once

  return (
    <div>
      <Toaster richColors position="top-right" expand={true} />
    </div>
  );
}

export default App;
