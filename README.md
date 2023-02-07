

<!-- KILL PORT  -->
netstat -ano | findstr :<PORT>
taskkill /PID <PID> /F