import './Notificaciones.css';

function Notificaciones(){
    console.log("entering notifications");
    const user = JSON.parse(localStorage.getItem('user'));
    let notifs = JSON.parse(localStorage.getItem('notifs')).filter(notif => notif.user === user.user);
    console.log("notifs", notifs.length);
    return (
        <div className="notif-list">
            <h2>Notificaciones</h2>
            {notifs.map((item) => (
              <div className="notif-item">
                {item.title} {item.date}
              </div>
            ))}
        </div>
    )
}

export default Notificaciones;