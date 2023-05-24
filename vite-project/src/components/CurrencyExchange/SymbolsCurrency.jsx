import { useDispatch } from "react-redux";
import { getCurrencyRateAPI } from "../../redux/Actions/Actions.js";

const SymbolsCurrency = () => {
  const dispatch = useDispatch();

  const onChangeCurrency = (event) => {
    dispatch(getCurrencyRateAPI(event.target.value));
  };

  return (
    <select onChange={onChangeCurrency}>
      <option value="AED">
        Dírham de los Emiratos Árabes Unidos
      </option>
      <option value="AFN">Afgani afgano</option>
      <option value="ALL">Lek albanés</option>
      <option value="AMD">Drama armenio</option>
      <option value="ANG">Florín antillano holandés</option>
      <option value="AOA">Kwanza angoleño</option>
      <option value="ARS" selected>
        Peso argentino
      </option>
      <option value="AUD">Dólar australiano</option>
      <option value="AWG">Florín arubeño</option>
      <option value="AZN">Manat azerbaiyano</option>
      <option value="BAM">
        Marco convertible de Bosnia y Herzegovina
      </option>
      <option value="BBD">Dólar de Barbados</option>
      <option value="BDT">Taka de Bangladesh</option>
      <option value="BGN">lev búlgaro</option>
      <option value="BHD">dinar bahreiní</option>
      <option value="BIF">Franco de Burundi</option>
      <option value="BMD">Dólar bermudeño</option>
      <option value="BND">Dólar de Brunéi</option>
      <option value="BOB">Boliviano boliviano</option>
      <option value="BRL">Real brasileño</option>
      <option value="BSD">Dólar bahameño</option>
      <option value="BTC">Bitcoin</option>
      <option value="BTN">Ngultrum butanés</option>
      <option value="BWP">Pula de Botsuana</option>
      <option value="BYN">Nuevo rublo bielorruso</option>
      <option value="BYR">Rublo bielorruso</option>
      <option value="BZD">Dólar de Belice</option>
      <option value="CAD">Dólar canadiense</option>
      <option value="CDF">Franco congoleño</option>
      <option value="CHF">Franco suizo</option>
      <option value="CLF">Unidad de Cuenta Chilena (UF)</option>
      <option value="CLP">Peso chileno</option>
      <option value="CNY">Yuan chino</option>
      <option value="COP">Peso colombiano</option>
      <option value="CRC">Colón costarricense</option>
      <option value="CUC">Peso Cubano Convertible</option>
      <option value="CUP">Peso Cubano</option>
      <option value="CVE">Escudo de Cabo Verde</option>
      <option value="CZK">Corona de la República Checa</option>
      <option value="DJF">Franco yibutiano</option>
      <option value="DKK">Corona danesa</option>
      <option value="DOP">Peso dominicano</option>
      <option value="DZD">Dinar argelino</option>
      <option value="EGP">Libra egipcia</option>
      <option value="ERN">Eritrea Nakfa</option>
      <option value="ETB">birr etíope</option>
      <option value="EUR">euros</option>
      <option value="FJD">Dólar fiyiano</option>
      <option value="FKP">Libra de las Islas Malvinas</option>
      <option value="GBP">Libra esterlina británica</option>
      <option value="GEL">Lari georgiano</option>
      <option value="GGP">Libra de Guernsey</option>
      <option value="GHS">Cedi de Ghana</option>
      <option value="GIP">Libra gibraltareña</option>
      <option value="GMD">Dalasi gambiano</option>
      <option value="GNF">franco guineano</option>
      <option value="GTQ">Quetzal guatemalteco</option>
      <option value="GYD">Dólar guyanés</option>
      <option value="HKD">Dólar de Hong Kong</option>
      <option value="HNL">lempira hondureño</option>
      <option value="HRK">kuna croata</option>
      <option value="HTG">Gourde haitiano</option>
      <option value="HUF">Florín húngaro</option>
      <option value="IDR">Rupia indonesia</option>
      <option value="ILS">Nuevo séquel israelí</option>
      <option value="IMP">Libra manesa</option>
      <option value="INR">Rupia india</option>
      <option value="IQD">dinar iraquí</option>
      <option value="IRR">Rial iraní</option>
      <option value="ISK">Corona islandesa</option>
      <option value="JEP">Libra Jersey</option>
      <option value="JMD">Dólar jamaicano</option>
      <option value="JOD">Dinar jordano</option>
      <option value="JPY">Yen japonés</option>
      <option value="KES">Chelín de Kenia</option>
      <option value="KGS">Som kirguís</option>
      <option value="KHR">Riel camboyano</option>
      <option value="KMF">Franco comorano</option>
      <option value="KPW">Won norcoreano</option>
      <option value="KRW">Won surcoreano</option>
      <option value="KWD">dinar kuwaití</option>
      <option value="KYD">Dólar de las Islas Caimán</option>
      <option value="KZT">Tenge kazajo</option>
      <option value="LAK">kip laosiano</option>
      <option value="LBP">Libra Libanesa</option>
      <option value="LKR">Rupia de Sri Lanka</option>
      <option value="LRD">Dólar liberiano</option>
      <option value="LSL">Lesoto Loti</option>
      <option value="LTL">Litas lituana</option>
      <option value="LVL">Lats de Letonia</option>
      <option value="LYD">Dinar libio</option>
      <option value="MAD">Dírham marroquí</option>
      <option value="MDL">leu moldavo</option>
      <option value="MGA">Ariary malgache</option>
      <option value="MKD">Dinar macedonio</option>
      <option value="MMK">Kyat de Birmania</option>
      <option value="MNT">Tugrik mongol</option>
      <option value="MOP">Pataca de Macao</option>
      <option value="MRO">Ouguiya mauritano</option>
      <option value="MUR">Rupia de Mauricio</option>
      <option value="MVR">Rufiyaa de Maldivas</option>
      <option value="MWK">Kwacha de Malawi</option>
      <option value="MXN">Peso Mexicano</option>
      <option value="MYR">Ringgit de Malasia</option>
      <option value="MZN">Metical mozambiqueño</option>
      <option value="NAD">Dólar de Namibia</option>
      <option value="NGN">naira nigeriana</option>
      <option value="NIO">Nicaragüense Córdoba</option>
      <option value="NOK">Corona noruega</option>
      <option value="NPR">Rupia nepalí</option>
      <option value="NZD">Dólar de Nueva Zelanda</option>
      <option value="OMR">Rial omaní</option>
      <option value="PAB">Balboa Panameño</option>
      <option value="PEN">Nuevo Sol Peruano</option>
      <option value="PGK">Kina de Papúa Nueva Guinea</option>
      <option value="PHP">Peso filipino</option>
      <option value="PKR">Rupia paquistaní</option>
      <option value="PLN">Zloty polaco</option>
      <option value="PYG">Guaraní paraguayo</option>
      <option value="QAR">rial qatarí</option>
      <option value="RON">leu rumano</option>
      <option value="RSD">Dinar serbio</option>
      <option value="RUB">Rublo ruso</option>
      <option value="RWF">Franco ruandés</option>
      <option value="SAR">Riyal saudí</option>
      <option value="SBD">Dólar de las Islas Salomón</option>
      <option value="SCR">Rupia de Seychelles</option>
      <option value="SDG">Libra sudanesa</option>
      <option value="SEK">Corona sueca</option>
      <option value="SGD">Dólar de Singapur</option>
      <option value="SHP">Libra de Santa Elena</option>
      <option value="SLE">Leona de Sierra Leona</option>
      <option value="SLL">Leona de Sierra Leona</option>
      <option value="SOS">Chelín somalí</option>
      <option value="SRD">Dólar surinamés</option>
      <option value="STD">Dobra de Santo Tomé y Príncipe</option>
      <option value="SVC">Colón Salvadoreño</option>
      <option value="SYP">Libra siria</option>
      <option value="SZL">Suazi Lilangeni</option>
      <option value="THB">baht tailandés</option>
      <option value="TJS">Somoni tayiko</option>
      <option value="TMT">Manat turkmenistán</option>
      <option value="TND">Dinar tunecino</option>
      <option value="TOP">Tongan Paʻanga</option>
      <option value="TRY">Lira turca</option>
      <option value="TTD">Dólar de Trinidad y Tobago</option>
      <option value="TWD">Nuevo dólar taiwanés</option>
      <option value="TZS">Chelín de Tanzania</option>
      <option value="UAH">grivna ucraniana</option>
      <option value="UGX">Chelín ugandés</option>
      <option value="USD">Dólar de los Estados Unidos</option>
      <option value="UYU">Peso uruguayo</option>
      <option value="UZS">Uzbekistán Som</option>
      <option value="VEF">Venezolana Bolívar Fuerte</option>
      <option value="VES">Soberano Bolívar</option>
      <option value="VND">Dong vietnamita</option>
      <option value="VUV">Vanuatu Vatu</option>
      <option value="WST">Samoano Tala</option>
      <option value="XAF">Franco CFA BEAC</option>
      <option value="XAG">Plata (onza troy)</option>
      <option value="XAU">Oro (onza troy)</option>
      <option value="XCD">Dólar del Caribe Oriental</option>
      <option value="XDR">Derechos especiales de giro</option>
      <option value="XOF">Franco CFA BC</option>
    </select>
  );
};

export default SymbolsCurrency;
