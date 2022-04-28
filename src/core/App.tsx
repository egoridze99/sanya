import React from "react";
import ElectroEnergy from "src/modules/ElectroEnergy";
import Notifications from "../components/Notifications/Notifications";
import {useStore} from "./context/useStore";
import {observer} from "mobx-react-lite";

const App = () => {
  const {notifications} = useStore();

  return (
    <>
      <ElectroEnergy />
      <Notifications
        notifications={notifications.notifications}
        clearNotifications={() => notifications.clearNotifications()}
        removeNotification={(n) => notifications.removeNotification(n)}
      />
    </>
  );
};

export default observer(App);
