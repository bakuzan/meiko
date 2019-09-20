export interface RatingControlProps {
  containerClassName?: string;
  id: string;
  name?: string;
  label?: string;
  value: string | number;
  maxRating?: number;
  onChange?: () => void;
}

declare const RatingControl: React.SFC<RatingControlProps>;

export default RatingControl;
