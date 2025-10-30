import { X, RotateCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { LanguageSelector } from './LanguageSelector';
import { AccessibilityProfiles } from './AccessibilityProfiles';
import { AccessibilityControls } from './AccessibilityControls';
import type { AccessibilitySettings } from '@/hooks/useAccessibility';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onToggle: (key: keyof AccessibilitySettings) => void;
  onUpdate: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  onReset: () => void;
  onApplyProfile: (profileId: string) => void;
}

export function AccessibilityPanel({
  isOpen,
  onClose,
  settings,
  onToggle,
  onUpdate,
  onReset,
  onApplyProfile,
}: AccessibilityPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9997] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div data-a11y-widget="true" className="fixed bottom-4 right-4 left-4 sm:left-auto w-auto sm:w-full sm:max-w-[480px] h-[85vh] bg-background border rounded-2xl z-[9999] animate-slide-in-right shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b flex items-center justify-between bg-gradient-to-r from-[#853DE4] to-[#9b5df0] text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center p-1">
                <svg
                  viewBox="0 0 2731 2731"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  aria-hidden="true"
                >
                  <rect x="115" y="115" width="2500" height="2500" rx="1250" fill="white"/>
                  <path d="M1315.33 342.8C1084.27 353.867 865.733 442.4 689.333 596.533C669.067 614.267 626.267 656.4 607.2 677.467C482.933 814.8 399.333 979.6 362.133 1160.67C334.933 1293.47 334.933 1437.2 362.133 1570C398.133 1745.47 476.667 1903.6 595.867 2040.67C613.733 2061.33 669.333 2116.93 690 2134.8C817.733 2245.87 962.8 2321.07 1125.33 2360.53C1282.8 2398.8 1452.4 2398.4 1610.93 2359.2C1905.87 2286.53 2153.47 2085.87 2286.67 1811.6C2415.07 1547.2 2423.07 1239.87 2308.53 967.067C2246.53 819.2 2146.4 684.267 2020.8 579.067C1824.93 414.933 1572.8 330.533 1315.33 342.8ZM1404.67 579.867C1422.4 583.867 1438.27 589.6 1454.27 598C1497.73 620.533 1530.8 659.2 1547.07 706.133C1554.8 728.667 1556.67 740.133 1556.67 768C1556.67 795.867 1554.93 807.2 1547.07 830C1524.53 895.067 1470.4 942.4 1401.33 956.933C1385.07 960.4 1345.33 960.267 1328.67 956.8C1303.73 951.6 1278.67 941.067 1257.33 926.8C1242.93 917.333 1222.27 897.333 1211.33 882.667C1195.47 861.467 1182.27 831.867 1176.53 804.667C1173.07 788 1172.93 748.267 1176.4 732C1184.13 694.667 1201.07 662.133 1226.67 635.6C1256.53 604.4 1293.33 585.067 1336.67 577.867C1352.13 575.333 1389.07 576.4 1404.67 579.867ZM798 937.2C834.133 946 898.267 960.533 946.133 970.533C1279.87 1040.93 1450.4 1041.07 1781.6 971.2C1826 961.867 1841.2 958.533 1908 943.067L1963.33 930.4L1978 931.067C1989.33 931.467 1994.8 932.4 2001.6 934.933C2026.8 944.4 2044.8 962.267 2054.4 987.733C2057.47 995.733 2057.87 998.667 2057.87 1014.67C2058 1030.27 2057.6 1034 2054.8 1042.53C2048 1063.2 2031.47 1082.27 2011.6 1092C2002.8 1096.4 1993.6 1099.07 1963.33 1106.13C1806.27 1142.93 1682.53 1167.07 1590.4 1178.93L1556 1183.33V1214.67C1556 1231.87 1556.67 1267.33 1557.33 1293.33C1563.6 1516.93 1579.73 1665.87 1611.2 1789.87C1626.13 1848.27 1638 1883.47 1673.47 1973.6C1682.8 1997.6 1691.6 2020.93 1692.8 2025.6C1696.27 2038.13 1695.87 2059.2 1692.13 2072.53C1687.33 2089.73 1679.6 2103.07 1667.33 2115.33C1655.2 2127.47 1644 2134.53 1628.67 2139.6C1619.2 2142.8 1615.87 2143.2 1599.33 2143.2C1581.73 2143.33 1580 2143.07 1568.93 2139.07C1562.53 2136.8 1553.87 2132.93 1549.73 2130.53C1538.13 2123.6 1521.6 2106.53 1515.6 2095.07C1506 2076.8 1462 1961.87 1447.6 1918C1423.73 1845.2 1404.27 1759.6 1393.33 1680.67C1390.8 1661.87 1394.4 1664 1365.33 1664C1336.27 1664 1339.87 1661.87 1337.33 1680.67C1326.53 1758.67 1306.67 1846.13 1283.07 1918C1268.67 1962 1224.53 2076.8 1215.07 2095.07C1208.93 2106.93 1192.4 2123.87 1180 2131.07C1175.2 2133.87 1166.53 2137.73 1160.67 2139.6C1151.2 2142.8 1147.87 2143.2 1131.33 2143.2C1113.73 2143.33 1112 2143.07 1100.93 2139.07C1087.6 2134.4 1077.47 2128.53 1068 2120.27C1054.13 2108.27 1042.67 2089.33 1037.87 2070.67C1034.8 2059.33 1034.8 2036.8 1037.6 2026C1038.8 2021.6 1047.6 1998.13 1057.07 1974C1084.53 1904.27 1093.73 1878.4 1105.47 1840C1141.33 1722.27 1160.8 1584.93 1170 1386C1172.53 1328.93 1174.67 1252.8 1174.67 1213.87V1183.07L1160.4 1181.47C1090.67 1173.73 975.867 1152.93 858.133 1126.67C751.733 1103.07 730.933 1097.87 718.933 1091.87C699.467 1082.4 683.733 1064.53 676.267 1043.73C671.733 1030.93 670.667 1008.8 673.867 995.867C681.867 964.8 704.933 941.333 736 932.667C749.067 929.067 771.2 930.8 798 937.2Z" fill="#853DE4"/>
                </svg>
              </div>
              <h2 className="text-lg font-semibold">Accessibility Menu</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Close accessibility menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 overflow-auto">
            <div className="space-y-5 p-5">
              {/* Language */}
              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#853DE4] rounded-full"></span>
                  Language
                </h3>
                <LanguageSelector
                  value={settings.language}
                  onChange={(value) => onUpdate('language', value)}
                />
              </div>

              {/* Profiles */}
              <div className="bg-muted/30 rounded-xl p-4">
                <AccessibilityProfiles
                  activeProfile={settings.activeProfile}
                  onSelectProfile={onApplyProfile}
                />
              </div>

              {/* Oversized Widget */}
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold block">XL Widget Size</span>
                    <span className="text-xs text-muted-foreground">Increase accessibility button size</span>
                  </div>
                  <Switch
                    checked={settings.oversizedWidget}
                    onCheckedChange={() => onToggle('oversizedWidget')}
                  />
                </div>
              </div>

              {/* Main Controls */}
              <AccessibilityControls
                settings={settings}
                onToggle={onToggle}
                onUpdate={onUpdate}
              />
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-5 border-t bg-muted/30 space-y-3">
            <Button
              onClick={onReset}
              variant="default"
              className="w-full bg-[#853DE4] hover:bg-[#7532cc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#853DE4] focus-visible:outline-offset-2"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Settings
            </Button>

            <div className="flex items-center justify-center text-xs text-muted-foreground">
              <a
                href="#"
                className="hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#853DE4] focus-visible:outline-offset-2 rounded px-2 py-1"
              >
                Accessibility Statement
              </a>
              <span className="mx-2">•</span>
              <span>CTRL+U to toggle</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
