import { useState, useEffect } from "react"
import OrdersTable from "../components/admin/OrdersTable";

export default function Orders({url}) {
  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  }, []);

  return (
    <OrdersTable url={url} />
  )
}