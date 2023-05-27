import { Line, Bar, Doughnut } from "react-chartjs-2";
import "./Estadisticas.css";
import {
  // en line chart debo importar LineElement
  // en Bar es BarElement
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
//*---------grafico de lineas:

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Colors
);

const EstadisticasLineal = () => {
  //*---------------------------------Data Del Grafico:
  //? Data es la informacion referente en la que se va a ver en el grafico. ejemplo(precios , ventas , fechas , lo que sea).

  const Ganancias = [100, 1000, 29000, 200123, 500000]; // eje Y
  const Fechas = [
    "20/05/2023",
    "21/05/2023",
    "20/06/2023",
    "21/10/2023",
    "21/11/2023",
  ];

  let data = {
    labels: Fechas, // Labels seria el eje X de la grafica y lo que se va a  mostrar.
    datasets: [
      {
        label: "Datos Del Usuario En Linea",
        data: Ganancias,
        fill: true, // seria el arrea de la linea (todo lo que hay por debajo)
        borderColor: "orange", // los estilos en commilllas
        // backgroundColor: "blue",
        pointRadius: 6,
        pointBorderColor: "black",
        pointBackgroundColor: "white",
      },
    ],
  };

  //* datasets ==> [] ??? Datasets es un array porque cada objeto es solo una linea , por lo tanto puedo crear varias lineas en objetos diferentes en un mismo grafico

  //label : "datos user" ==> seria el "titulo"  de la estadistica
  //data: ==>  seria los datos a mostrar
  // Fill : true ==>   si las lines van a ser rectas o curvas
  //borderColor: red ==> clor de los bordes de la linea.
  //backgroundColor: yellow ==> colo de fondo del grafico
  //pointRadius: 5 ===> el tamaño del punto del grafico.
  //pointBorderColor : blue ===> es el color que se le pone al punto del grafico .
  //pointBackgroundColor: blue ===> El color de fondo del puto del grafico.

  //*-----------------------OPTIONS:
  //* Las opciones trabajan en la grafica no en las lineas.
  //* Es donde voy a determinar de como quiero que funcione mi grafica.

  let options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Show tooltips when hovering over points
      },
      legend: {
        display: true, // Display the chart legend
      },
    },
  };

  return (
    <div className="ContainerGraficoLinea">
      <Line data={data} options={options} />
    </div>
  );
};

//*----------------------------------------Barra:
//import { Bar } from 'react-chartjs-2';
//BarElement
//Bar

const EstadisticasBarra = () => {
  const Ganancias = [100, 1000, 29000, 200123, 500000]; // eje Y
  const Fechas = [
    "20/05/2023",
    "21/05/2023",
    "20/06/2023",
    "21/10/2023",
    "21/11/2023",
  ];
  const data = {
    labels: Fechas,
    datasets: [
      {
        label: "Datos Del Usuario En Barra ",
        data: Ganancias,
        backgroundColor: "orange",
        borderWidth: 5, // es el borde de las barras
        borderColor: "gray",
        borderRadius: 5, // el borde de la barra
        inflateAmount: 0, // tamaño de las barras tanto alto como ancho
      },
    ],
  };

  let options = {
    responsive: true, // es responsivo
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Show tooltips when hovering over points
      },
      title: {
        aling: true,
      },
      legend: {
        display: true, // Display the chart legend
      },
    },
  };

  return (
    <div className="ContainerGraficoBar">
      <Bar data={data} options={options} />
    </div>
  );
};

//*----------------------------------------Doughnut:
//import { Doughnut } from 'react-chartjs-2';
//Doughnut

const EstadisticasDoughnut = () => {
  const Ganancias = [100, 1000, 29000, 200123, 500000]; // eje Y
  const Fechas = [
    "20/05/2023",
    "21/05/2023",
    "20/06/2023",
    "21/10/2023",
    "21/11/2023",
  ];
  const data = {
    labels: Fechas,
    datasets: [
      {
        label: "Datos Del Usuario En Dona ",
        data: Ganancias,
        backgroundColor: "#36A2EB80",
        borderWidth: 5, // es el borde de las barras
        borderColor: "gray",
        borderRadius: 5, // el borde de la barra
        inflateAmount: 0, // tamaño de las barras tanto alto como ancho
      },
    ],
  };

  let options = {
    responsive: true, // es responsivo
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Show tooltips when hovering over points
      },
      title: {
        aling: true,
      },
      legend: {
        display: true, // Display the chart legend
      },
    },
    cutout: 40, // es el tamaño del agujero de la dona
    // radius: 100, // tamaño de la dona (predeterminado son 100px)
    rotation: 0, // rotacion de la dota
    animation: {
      animateRotate: true, // esto serian animaciones
      animateScale: true,
    },
  };

  return (
    <div className="ContainerGraficoDona">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export { EstadisticasLineal, EstadisticasBarra, EstadisticasDoughnut };
