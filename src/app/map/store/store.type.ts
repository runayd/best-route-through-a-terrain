
export interface ApplicationState {
    showMenu: boolean;
    showCard: boolean;
    findPath: boolean;
}
  
export const INITIAL_STATE: ApplicationState = {
    showMenu: false,
    showCard: true,
    findPath: true
};
