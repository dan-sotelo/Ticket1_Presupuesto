let fechas = ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11'];
function agregarColumnas() {
    let numColumnas = document.getElementById('ColumnasHead').getElementsByTagName('th').length - 2;
    console.log(numColumnas);

    let agregar = document.querySelector("#ColumnasHead");
    let template = document.querySelector("#Periodos").content
    let mes = template.querySelector('.Mes')
    mes.setAttribute('id','fecha-tabla1-'+numColumnas)
    mes.textContent = fechas[numColumnas];
    let fragment = document.createDocumentFragment();
    let clone = template.cloneNode(true);
    fragment.appendChild(clone);
    agregar.insertBefore(fragment,document.getElementById('sumatoriaTotal'));
    


    let agregarIngresos = document.querySelector("#datosIngresos");
    let templateIngresos = document.querySelector("#Ingresos").content
    let fragmentIngresos = document.createDocumentFragment();
    let cloneIngresos = templateIngresos.cloneNode(true);
    fragmentIngresos.appendChild(cloneIngresos);
    agregarIngresos.insertBefore(fragmentIngresos,document.getElementById('sumaIngresos'));
    
    let agregarEgresos = document.querySelector("#datosEgresos");
    let templateEgresos = document.querySelector("#Egresos").content
    let fragmentEgresos = document.createDocumentFragment();
    let cloneEgresos = templateEgresos.cloneNode(true);
    fragmentEgresos.appendChild(cloneEgresos);
    agregarEgresos.insertBefore(fragmentEgresos,document.getElementById('sumaEgresos'));

    let agregarTotal = document.querySelector("#datosTotal");
    let templateTotal = document.querySelector("#Total").content
    let fragmentTotal = document.createDocumentFragment();
    let cloneTotal = templateTotal.cloneNode(true);
    fragmentTotal.appendChild(cloneTotal);
    agregarTotal.insertBefore(fragmentTotal,document.getElementById('sumaTotal'));

    let agregarTotalAcumulado = document.querySelector("#datosTotalAcumulado");
    let templateTotalAcumulado = document.querySelector("#TotalAcumulado").content
    let fragmentTotalAcumulado = document.createDocumentFragment();
    let cloneTotalAcumulado = templateTotalAcumulado.cloneNode(true);
    fragmentTotalAcumulado.appendChild(cloneTotalAcumulado);
    agregarTotalAcumulado.insertBefore(fragmentTotalAcumulado,document.getElementById('sumaTotalAcumulado'));
}