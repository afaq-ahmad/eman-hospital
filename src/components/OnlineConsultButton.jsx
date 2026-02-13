import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function OnlineConsultButton({ size = 'sm', className = '', ...rest }) {
  return (
    <Button
      asChild
      size={size}
      className={`bg-[#00bfa6] text-white hover:bg-[#00bfa6]/90 shadow-lg ${className}`}
      {...rest}
    >
      <Link to="/online-consultation">Online Consultation</Link>
    </Button>
  );
}
