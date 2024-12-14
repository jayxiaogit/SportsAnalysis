import Navbar from "@/components/ui/navbar";

const GetStarted = () => {
  return (
    <div
      className="home-page"
      style={{
        background: "linear-gradient(to bottom, #4facfe, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Navbar />
      <div
        className="content"
        style={{
          width: "100%",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <strong
          style={{
            fontFamily: "Faustina-Regular, Helvetica",
            fontSize: "18px",
            color: "#002d72",
            textAlign: "center",
            textDecoration: "underline",
            marginBottom: "40px",
          }}
        >
          Let's Get Started!
        </strong>
        <p
          style={{
            fontFamily: "Faustina-Regular, Helvetica",
            fontSize: "18px",
            color: "#002d72",
            textAlign: "center",
          }}
        >
          If you haven’t used our model before, create a new account!
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)", 
            gap: "20px",
            width: "60%",
            marginTop: "40px",
            padding: "20px",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "2px solid #002d72",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Faustina-Regular, Helvetica",
                fontSize: "18px",
                color: "#002d72",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Create New Schedule
            </p>
            <ul
              style={{
                fontFamily: "Faustina-Regular, Helvetica",
                fontSize: "16px",
                color: "#002d72",
                textAlign: "left",
                listStyleType: "disc",
                paddingLeft: "20px",
              }}
            >
              <li>Go to Dashboard</li>
              <li>Click on 'Generate New Schedule'</li>
              <li>Enter the necessary information</li>
              <li>Press 'Generate'</li>
              <li>View your schedule!</li>
              <li>Generate again with the 'Regenerate' button</li>
            </ul>
          </div>
          <div
            style={{
              background: "#ffffff",
              border: "2px solid #002d72",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Faustina-Regular, Helvetica",
                fontSize: "18px",
                color: "#002d72",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Save Schedules
            </p>
            <ul
              style={{
                fontFamily: "Faustina-Regular, Helvetica",
                fontSize: "16px",
                color: "#002d72",
                textAlign: "left",
                listStyleType: "disc",
                paddingLeft: "20px",
              }}
            >
              <li>After generating a schedule, you can scroll down to the bottom and press 'Save Schedule'</li>
              <li>Give it a name!</li>
            </ul>
          </div>
          <div
            style={{
              background: "#ffffff",
              border: "2px solid #002d72",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Faustina-Regular, Helvetica",
                fontSize: "18px",
                color: "#002d72",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              View Previous Schedules
            </p>
            <ul
              style={{
                fontFamily: "Faustina-Regular, Helvetica",
                fontSize: "16px",
                color: "#002d72",
                textAlign: "left",
                listStyleType: "disc",
                paddingLeft: "20px",
              }}
            >
              <li>Go to Dashboard</li>
              <li>Go to Manage Schedules</li>
              <li>View the past Schedules you have saved</li>
              <li>You can edit them or delete them</li>
              <li>If you are a group owner, you can also see your player's schedules attached to their account</li>
            </ul>
          </div>
          <div
            style={{
              background: "#ffffff",
              border: "2px solid #002d72",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Faustina-Regular, Helvetica",
                fontSize: "18px",
                color: "#002d72",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Print Schedules
            </p>
            <ul
              style={{
                fontFamily: "Faustina-Regular, Helvetica",
                fontSize: "16px",
                color: "#002d72",
                textAlign: "left",
                listStyleType: "disc",
                paddingLeft: "20px",
              }}
            >
              <li>Go to Dashboard</li>
              <li>Go to Manage Schedules</li>
              <li>Click the download button</li>
              <li>View in PDF format and press print!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
