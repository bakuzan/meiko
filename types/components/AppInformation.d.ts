export interface AppInformationProps {
  version?: string;
  branch?: string;
}

declare function AppInformation(props: AppInformationProps): React.ReactElement;

export default AppInformation;
