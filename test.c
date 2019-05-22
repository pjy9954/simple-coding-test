#include <stdio.h>

void main()
{
    /*
     *  HINT : Part of ASCII code table
     * 
     *  | a | 0x61 | j | 0x6a | s | 0x73 | 1 | 0x31 |
     *  | b | 0x62 | k | 0x6b | t | 0x74 | 2 | 0x32 |
     *  | c | 0x63 | l | 0x6c | u | 0x75 | 3 | 0x33 |
     *  | d | 0x64 | m | 0x6d | v | 0x76 | 4 | 0x34 |
     *  | e | 0x65 | n | 0x6e | w | 0x77 | 5 | 0x35 |
     *  | f | 0x66 | o | 0x6f | x | 0x78 | 6 | 0x36 |
     *  | g | 0x67 | p | 0x70 | y | 0x79 | 7 | 0x37 |
     *  | h | 0x68 | q | 0x71 | z | 0x7a | 8 | 0x38 |
     *  | i | 0x69 | r | 0x72 | 0 | 0x30 | 9 | 0x39 |
     */

    

    int src_str[8][6] = {
        {3, 0, 1, 1, 0, 0},
        {1, 0, 0, 1, 1, 1},
        {3, 0, 1, 0, 1, 0},
        {3, 0, 1, 3, 0, 0},
        {3, 0, 0, 1, 0, 1},
        {1, 0, 0, 3, 1, 1},
        {3, 0, 0, 3, 1, 1},
        {3, 0, 0, 2, 1, 0}
    };

    short filter[] = {0xfedc, 0x0123, 0xba98, 0x4567};

    short endian_checker = 0x0001;
    printf("%02d\n", *((char *)&endian_checker)); //해당 코드의 실행 결과 : 01

    int i = 0, j = 0;
    for (i = 0; i < 8; i++) {
        char result[2] = { 0, };

        for (j = 0; j < 2; j++) {
            int f_sel = src_str[i][3 * j];
            int b_sel = src_str[i][3 * j + 1];
            int n_sel = src_str[i][3 * j + 2];

            short select_filter = filter[f_sel];
            char select_byte = *((char *)&select_filter + b_sel);
            char select_nibble = (select_byte >> (4 * n_sel)) & 0xF;

            switch (j) {
            case 0:
                result[0] = select_nibble << 4;
                break;
            case 1:
                result[0] |= select_nibble;
                break;
            }
        }

        printf("%s", result);
    }
    printf("\n");
}