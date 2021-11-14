export const StorageUtil = () => {

    const saveLocalData = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };
  
    const loadLocalData = key => {
        const data = localStorage.getItem(key);
        return JSON.parse(data);
    };

    const saveSessionData = (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    };
    
    const loadSessionData = key => {
        const data = sessionStorage.getItem(key);
        return JSON.parse(data);
    };
  
    return {
        saveLocalData,
        loadLocalData,
        saveSessionData,
        loadSessionData,
    };
  };