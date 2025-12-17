# licence cc0/bsd0/mit0 (not that i really think licences make sense for bash scripts)
qpakman qcompat_base/*.png -o base.wad | grep -i -B 1 fail | grep -v WAD2
qpakman qcompat_jrmed/*.png -o jr_med.wad | grep -i -B 1 fail | grep -v WAD2
qpakman qcompat_med/*.png -o medieval.wad | grep -i -B 1 fail | grep -v WAD2
qpakman qcompat_metal/*.png -o metal.wad | grep -i -B 1 fail | grep -v WAD2
qpakman qcompat_start/*.png -o start.wad | grep -i -B 1 fail | grep -v WAD2
qpakman qcompat_tim/*.png -o tim.wad | grep -i -B 1 fail | grep -v WAD2
qpakman qcompat_wizard/*.png -o wizard.wad | grep -i -B 1 fail | grep -v WAD2

