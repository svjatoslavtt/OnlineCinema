export type InputInterface = {
  id: number;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  empty?: boolean;
	required?: boolean;
	icon?: string;
}