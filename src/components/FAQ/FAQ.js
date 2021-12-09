import * as classes from './FAQ.module.css';
import { useTranslation } from 'react-i18next';

const FAQ = () => {

    const { t } = useTranslation();

    return (

        <div className={classes.faqContainer}>
            <div className={classes.faqTitle}>
                {t("faq.title")}:
            </div>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut laoreet risus.
            In fringilla ex non mauris congue pretium. Nulla ornare euismod tellus, ac gravida tortor fermentum faucibus.
            Vivamus lobortis pellentesque purus, ut ultrices odio venenatis sit amet. Morbi tempus turpis et
            tincidunt lacinia. Donec dictum est ut felis viverra, vitae imperdiet lorem maximus. Vestibulum sed nibh iaculis,
            feugiat nisl consectetur, suscipit sem. Etiam purus ante, ornare non urna in,
            cursus consequat ante. Vestibulum eu ligula pulvinar, pulvinar lorem ac, lobortis mi.
            Phasellus eu nunc vel magna accumsan varius sed ut lacus. Nulla facilisi. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            Mauris feugiat tincidunt nisi eget gravida. Morbi sit amet dignissim orci, ut sagittis odio.
            Nulla in augue id velit imperdiet porta. Sed venenatis sit amet eros ac bibendum.
            Quisque vulputate dapibus lobortis. Duis ligula mi, viverra sit amet tempor id, consectetur sit
            amet mi. Cras sit amet porttitor enim. In eleifend mi vel magna lobortis euismod. Sed molestie
            est at massa consectetur iaculis. Aliquam tempus magna eget felis luctus, quis laoreet felis dapibus.
            Integer mattis, metus quis convallis tincidunt, urna leo dapibus ligula, dignissim interdum dolor lacus ac turpis.
            Etiam vitae est quam. Vivamus viverra nec enim ut volutpat. Nullam at nunc a metus commodo viverra.
            Praesent pellentesque, diam id tincidunt ultricies, orci tortor congue odio, in viverra felis orci et magna.
            Phasellus iaculis turpis dolor, eget lobortis mi consectetur in. Proin iaculis, ligula ac cursus pulvinar,
            augue lorem varius lectus, eget feugiat lacus ligula nec leo. Maecenas mollis purus non suscipit rutrum.
            Sed molestie non nisi ut accumsan. Vivamus viverra nunc nec dapibus interdum. Cras sed fermentum nunc.
            Pellentesque tincidunt tempor odio, non blandit mi accumsan tempus.
            <br />
            <br />
            Nam tristique viverra aliquet.
            Cras rhoncus diam non dolor lacinia varius. Cras molestie purus id scelerisque euismod. Morbi ac efficitur tortor.
            Maecenas ullamcorper, metus a luctus interdum, dolor nisl ullamcorper magna, vitae malesuada ex lacus quis enim.
            Curabitur nec posuere ipsum. In ullamcorper convallis ante, non tempor dolor pulvinar at. Maecenas consequat arcu neque.
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacus erat,
            congue sed odio non, aliquet semper enim. Nullam placerat urna vel mattis pellentesque. Vivamus condimentum mi ac
            lobortis tristique. Phasellus nisl est, placerat eget iaculis id, vehicula at felis. Fusce porttitor ligula elit,
            nec egestas elit viverra a. Mauris suscipit euismod nisi, vitae luctus leo vehicula nec. Integer dictum mi a malesuada
            tincidunt. Sed facilisis est eu nibh pellentesque, nec aliquam sapien porta. Cras pretium dui augue, sit amet fermentum
            dolor mollis quis. Curabitur metus dolor, consectetur eu egestas non, auctor posuere ipsum. Ut bibendum justo at risus
            sollicitudin porttitor. Aenean eleifend velit turpis, a tempor augue mattis ultricies. Suspendisse cursus scelerisque
            fermentum. Nam vitae augue at nulla auctor porta eget lacinia tortor. Integer et eleifend dolor, eget volutpat dolor.
            Duis lacinia nulla lorem, nec ullamcorper dui pulvinar et. Etiam at efficitur eros. Mauris fringilla diam lectus,
            vitae viverra purus molestie nec. Nullam nisi est, consequat vitae leo non, interdum euismod mi. Morbi vitae arcu lacus.
            Vivamus sodales nulla ut tellus elementum elementum. Aenean at augue ut dolor aliquam lobortis. Vivamus molestie,
            mauris at gravida finibus, nunc velit ultricies metus, auctor gravida ante eros quis est.
            <br />
            <br />
            Etiam egestas tristique libero
            a sollicitudin. Donec eu urna facilisis, laoreet magna eget, venenatis nibh. Donec porta commodo ex, ac faucibus mauris
            rutrum in. Proin mattis tellus a ex volutpat egestas. In suscipit dignissim dolor vel condimentum. Aenean ut lacus
            eu eros ultricies venenatis. Vivamus luctus sed tellus in sagittis. Etiam aliquam at enim quis efficitur. Sed commodo
            lorem ut purus maximus, lobortis maximus turpis iaculis. Phasellus lacinia vel arcu eu porta. Nam sed turpis quis eros
            commodo bibendum vitae ac augue. Aliquam ac consequat augue. Mauris vitae mauris in enim eleifend placerat. Vestibulum
            tincidunt libero ipsum, quis tincidunt lacus faucibus in. Nullam est odio, semper ac suscipit eu, commodo nec massa.
            Praesent gravida, ligula dignissim blandit porttitor, ex libero ultricies augue, vel suscipit felis massa sit amet nisl.
            Donec rhoncus eget tellus in efficitur. Donec a porttitor orci. Vivamus lacinia mi a orci venenatis tempor. Duis vitae
            dui pulvinar, posuere mi nec, tincidunt leo. Quisque ut arcu vel lectus posuere viverra et id felis. In at posuere velit.
            Nullam mi erat, euismod vel lacus a, tempor auctor lorem. Vestibulum mattis sapien sed tincidunt ultricies.
            Suspendisse potenti. Donec in consectetur velit. Vivamus at volutpat tortor.
        </div>
    );
}

export default FAQ;