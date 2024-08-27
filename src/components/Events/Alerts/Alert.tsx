import Alert from '@mui/material/Alert'

interface AlertProps {
  type: "error" | "success"
  description: string
  className?: string
}

const AlertEvent = ({ type, description, className}: AlertProps) => {
  return (
    <div className={`${className} flex justify-center items-center w-full`}>
      <Alert 
        variant="outlined" 
        severity={type} 
        className="w-full text-center"
      >
        {description}
      </Alert>
    </div>
  );
}

export default AlertEvent
