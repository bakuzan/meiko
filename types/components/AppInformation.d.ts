export interface AppInformationProps {
  version?: string;
  branch?: string;
}

declare function AppInformation(
  props: AppInformationProps
): React.SFC<AppInformationProps>;

export default AppInformation;
