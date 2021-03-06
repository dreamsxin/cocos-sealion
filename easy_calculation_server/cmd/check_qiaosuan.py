import json
import urllib

import requests

exps = ["278+463+122+37", "5.76+13.67+4.24+6.33", "278+63+122+37", "2+3+12+7", "278-63+122-37",
        "37-52+63+32", "57-19+43-81", "100+1-100+1", "273-4.6-73-6.4", "273-46-73-64",
        "12.5×4×0.8×2.5", "2.5×4÷2.5×4", "12.5×4×(0.8×2.5)", "125×(37×8)", "25×(32×125)",
        "1.2×0.25", "72×125", "88×125", "2.5×3.2×1.25", "25×32×125", "732+(580+268)",
        "36.5-(14.8-3.5)", "21.4-(9.75+1.4)", "214-(86+14)", "(4×3.78)×0.25", "1.25÷(21÷0.8)",
        "278+463+(122+37)", "(13×125)×(3×8)", "32×12.5×0.25", "1÷0.32÷0.25÷1.25",
        "10÷3.2÷0.25÷1.25", "(37×125)×8", "178×101-178", "37.5×101-37.5", "5.7×99+5.7",
        "2.7×3.4+5.6×2.7-2.7", "27×3.4+5.6×27-27", "99×13+13", "2.7×3.4+5.6×2.7+2.7",
        "25×23+76×25+25", "144÷16+176÷16-96÷16", "3.7×1.1", "53×10.1", "93×101", "204×25",
        "3.5×9.9", "999×99", "99×16", "17×230-23×70", "86.7×0.356+1.33×3.56", "31×870+13×310",
        "3.63-0.99", "7.26-1.99", "15.7-9.9", "968-599", "157-99", "73-9", "363-198", "7.6÷0.25",
        "3.5÷0.125", "36-8", "12.06+5.07+2.94", "732+580+268", "732+580+268", "12.06+5.07+2.94",
        "37.24-23.79+16.76", "37.24-23.79+16.76", "0.25+0.75-0.25+0.75", "10.1+9-10.1+9",
        "25+75-25+75", "37.24+23.79-16.24", "37.24+23.79-16.24", "37.24+23.79-17.24", "586+325-86",
        "586+325-86", "273-46-73", "4×3.78×0.25", "125×37×8", "12.5÷4×0.8", "125÷4×8",
        "2.7÷0.9×2.7÷0.9", "25×4÷25×4", "36÷9×36÷9", "55.5×1.2÷11.1", "555×12÷111",
        "5.76+2.85+0.15", "755+287+13", "5.76-2.85+0.85", "7.5+2.87-0.87", "576-285+85",
        "755+287-87", "27.3-12.7-7.3", "273-27-73", "32.6÷0.4÷2.5", "1.96÷1.25÷8", "3000÷125÷8",
        "18.6÷25÷0.04", "3600÷25÷4", "7×1000÷125", "(12.06+5.07)+2.94", "36.5-(6.5-1.8)",
        "365-(65-118)", "1.25×(8÷0.5)", "1000÷(125÷4)", "1000÷(25×8)", "64÷(8×3)", "32×16+14×32",
        "3.68×4.79+6.32×4.79", "26.8×25.6-16.8×25.6", "83×102-83×2", "35×127-35×16-11×35",
        "1.25×(8-0.4)", "8×(12.5+0.25)", "125×(8+40)", "125×(40-8)", "25×(4+8)",
        "99+999+9999+99999", "98+998+9998", "0.99+9.9+99+999", "34×17+15×17+49×3", "5+95×28",
        "735-35×20", "175-75÷25", "98-18×5+25", "40+360÷40-1", "0.5+9.5×2.8", "10.75-0.75÷2.5",
        "9.8-1.8×12.5+2.5", "10.7×3.6+0.7×7.4", "3500÷14÷5", "140÷16+178÷16-94÷16",
        "7650-(550+4650)", "1×13×2×7×5", "1×2×3×4×5", "0.25+0.25×39", "13+99×13"]

url_latest = 'http://127.0.0.1:3000/expression/%s/scenes'
url_raw = 'https://api.mathufo.com/qiaosuan_old/v1.0/expression/%s/scenes'


def get_scenes(url_base, expression):
    url = url_base % urllib.parse.quote(expression)
    try:
        r = requests.get(url, timeout=1).content.decode('utf-8')
        return r
    except requests.exceptions.Timeout:
        return "timeout"


def write_json(a, version):
    parsed = json.loads(a)
    open(('%s/%d.json' % (version, idx)), 'w') \
        .write(json.dumps(parsed, indent=4, sort_keys=True, ensure_ascii=False))


for idx, ex in enumerate(exps):
    a1 = get_scenes(url_latest, ex)
    a2 = get_scenes(url_raw, ex)
    if a1 == 'timeout' or a2 == 'timeout':
        print('timeout', ex, a1 == 'timeout', a2 == 'timeout')
        # print
        # write_json(a1, 'latest')
        # write_json(a2, 'raw')
        break
    if a1 == a2:
        print('pass', ex)
    else:
        print('fail', idx, ex)
        #write_json(a1, 'latest')
        #write_json(a2, 'raw')
