/* Custom tab: blueprints generated on request.
   Same shape as data.js, plus `stats` (short facts shown as pills) and a picture stored in custom/.
   Each blueprint is built by a script in tools/, checked there, and rendered in the
   Factorio Blueprint Editor (fbe.factorygamefan.com). Newest first. */
const CUSTOM_BLUEPRINTS = [
  {
    "title": "Balanced unloading: belt mixer for 2 wagons",
    "category": "Trains",
    "image": "custom/unload-mixer.webp",
    "stats": [
      "3 splitters",
      "6 full belts out",
      "Chests stay"
    ],
    "desc": "<p>Makes both wagons empty at the same rate by mixing their belts. Each wagon's six half-full belts merge into three full ones, the bottom three weave between the top three, and every top belt shares a splitter with a bottom belt. A splitter takes the same amount from both inputs, so each pair draws equally from both wagons, whatever happens further down the line.</p><p>Three versions. <b>6 out top</b>: all six belts leave on the top rows, straight into the top balancer; the bottom balancer is no longer needed. <b>3 + 3</b>: three belts to each side, so both balancers stay in use; the bottom one has to move about 10 tiles left. <b>Whole station</b>: chests, inserters, poles and the 3 + 3 mixer, for building from scratch.</p><p>The two mixer versions begin at the 12 inserters that load the belts: line those up with yours. Old belts and the bottom balancer are in the way, so hold Ctrl + Shift while clicking (super force build) to have them replaced, or remove them first. The mixer is 8 tiles long, 11 for the 3 + 3 version.</p><p>Laid out for red belts, bulk inserters, 6 rows per wagon with one empty row between the wagons, and belts leaving to the left. Flip the blueprint for a mirrored station.</p><p>Built by <code>tools/unload_mixer.py</code> from a screenshot. Belt paths are checked by the script and in the Factorio Blueprint Editor. Not tested in the game.</p>",
    "blueprints": [
      {
        "label": "Mixer, 6 belts out top",
        "string": "0eNqd2d9u2yAUBvBXQdzsxqkMBv/JrvcIu5qqyUlog+bgCMjaqMq7z062ruvMdviuIrv271jI3wHTF74ZTuborYt8/cLtdnSBr7+88GAfXT/M51x/MHzNH/oQV+E42BiN55eCW7czz3wtLsXC1SEaM6y2exPim2vl5b7gxkUbrbmVuR6cv7rTYTOpa1H8US763oXj6ONqY4bIC34cw3Tv6OZKk1fe6YKfr79TkZ31Znv7q5DzU73DJYYLEl5huCThCsMrEq4xXJHwGsM1CW8wvCHhLYa3JLzD8I6EixJ80WkxEmBIBS1IAo0pLUoiM6irt21gyVOgVyU8DXo64dWg1ya8Bh2/MgG2KCgTYAeCxFmkBHna+ykFyNP6sZQgT2uaEk0XrbNJNGzE3iNzwyfyRic3i/INv+Q1oFcnvBb0Er1HdqCnlr2qBL1Er60E6CU6TyVBj7jEzA1Xlcfnhkvl8Wi2aK2hQrNF5Btw7LvEq9KCXmJarjrQS7QWVYJeorUoAXqJ1qIk6CVai0KzRfvGUmi2iDyaLeK8qNBwUX00XVS/RVtbYtWvOhRMrIJ1CYKJ/qIF6CX6i5agl+gvugK9RH/RaMBoOw0aDRjtm0Kj+SLyaLyIPJouIv8uaye3M/7Rj9Pv/0Z/4ZOr4PF8nC3rjqd5b/LvLasyu15FqDeeYqogmlXaF2Ut4fFT0PhV2fUUod4/xu9d9l83qf8upF+XrCVl5HQ2XNHgOhvWNDg36XVWFOsW5GnTdN2BPC0ITQnytEVYI0CetnPTSJAn7qX/Tu3mNHxbWReMX3wlk1ObWmJVLitIrM5lJYmtc9mKxDa5rCKxbS6rSWyXyzYUti1z2ZbEily2I7Ey+70l5aHNjpkgBaLNz9lCIu4LbqM5zMjrf4ULPvRTh5nOfXbD2O+se2QH+2z8mtVsbj2BTVMzGx2Le8PieGR+fArTbd+ND1dX17JTXadbVTd6ftCdCVtvj7eq/FO/3bOn/nF0HwIL9vl6PztMawbDpgcYJ9cbwx5Ow3Cr95GZyT5fa80nWNj33gTWs1/zKHuycT8db8YYx8P1ooKFcT7+WSqwne+tY328PnaYho75Ppo7frn8API1M3g="
      },
      {
        "label": "Mixer, 3 + 3 belts out",
        "string": "0eNqd2tGO4jYYBeBXsXzTm7CKHTuJ6XUfYa+qVZUBL0QNCYrNzoxGvHsTpp1OZ/D2+FwhAnxGv3x+O4YX+TBc/Hnuxyi3L7LfTWOQ299fZOgPYzes18bu5OVWfu9C3ITz0MfoZ3ktZD/u/ZPcqmtx590hej9sdkcf4rv36uu3Qvox9rH3r8Pcnjz/MV5OD4u6VcV/hotzN4bzNMfNgx+iLOR5Cstnp3EdafHKL7aQz7fHZZB9P/vd66tKr9/qA645XEF4xeEawg2HVxBuOdxAeM3hFsIbDm8gvOXwFsIdhzsIVyU50bEYKTKkCguSYmOKRUllBnXzvg3c8wzpVQnPkp5NeDXptQmvYetXJsCWBXUCdCQIriIlyWPzUyuSx/qx1iSPNU3NpgvrbJoNG9h7dG74VF51crOo3/H3vIb06oTXkl6i92hHeua+V5Wkl+i1lSK9ROepNOmBW8zccFV5fG64TB7PZgtrDRWbLZBvyNq7xFRpSS+xLFeO9BKtxZSkl2gtRpFeorUYTXqJ1mLYbGH3WIbNFsiz2QLXRcOGC/XZdKF+y7a2xK7fOBZM7IJtSYKJ/mIV6SX6i9Wkl+gvtiK9RH+xbMCwkwbLBgy7p7BsvkCejRfIs+kC+Q9Zu4x7Px/maXn8v+rfueUqZHw+r1Y/ni/r2eTnI6sye7wKGG+6xNSAbFaxO8pa0/UzVP2q7PEMMN5P6vch+2+H1J8Hsm9b1hKpnM2GKwyus2GLwblJr7OiWOcmvcnjc1fVNotvctdYl8crsvbYHqbRZO1BviJrD/KGrD3IW7L2WAttarL2IN+QtQf5lqw9yDuy9p+2Xu29n2FKUq8hnc1sA+ma1FtIr0gdO/FoDTnnQd6Scx7ka3LOgzy7zmKn9C27zhpo4jhShwLrSlKHAusUqUOBdewaC/7qy66xIM+usSDPrrHYGZZj11iQZ9fYCpo4LalDgXXsvhgKrCpLkq8xXpF8A/7bQZPTHvX/Te3DZfhz04/Bz3dv1pKHPuaua3Jdhbk219WYW+e6FeY2ua7B3DbXtZjrct0Gct/9bQd0W8xVua7DXJ09f7FgqOzAKSwZKj9xd6LxrZB99KcVefvrZCGHbuk2y7Wv4zB1+348iFP/5OetqMTahoKYLlHE6VysF6YYp9PyoR9+DjfV1toZ52xr6sauO++9D7u5P7+OKX/rdkfx2B2m8ZcgQv8k5ukxiJOfD14sw08iHmfvxffLMLyO9qvwi/28Dni7IMKxm30QnfjnqEk89vG4PH/9Lrc3FSJM6/O/hwpiP3f9KLrlex+9CEvhxNxF/0Ver38B9xjYRw=="
      },
      {
        "label": "Whole station",
        "string": "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"
      }
    ]
  },
  {
    "title": "Unloading balancer: 2 wagons, wiring only",
    "category": "Trains",
    "image": "custom/unload-balancer.webp",
    "stats": [
      "2 combinators",
      "84 chests wired",
      "Nothing moved"
    ],
    "desc": "<p>For a two-wagon unloading station where one wagon's chests drain faster than the other's. Each side's belt inserters run only while that side holds at least as much as the other, so the fuller side is emptied first and both wagons keep unloading.</p><p>Lay it over the station so every chest lines up, then click. Your chests and the 12 inserters that load the belts get wires and a condition. Only two arithmetic combinators and two poles are new, on the tile rows just above and below the belt end.</p><p>It expects steel chests 7 deep, 6 rows per wagon, one empty row between the wagons, bulk inserters loading belts on the left and the track on the right. Flip the blueprint if your station is mirrored.</p><p>How it works: all chests of a wagon are on one red wire into a combinator that adds them up (<code>Each × 1</code>), giving <code>T</code> for the top wagon and <code>B</code> for the bottom. Top inserters are enabled while <code>T ≥ B</code>, bottom inserters while <code>B ≥ T</code>.</p><p>Laying a blueprint over existing chests and inserters copies its settings onto them, so slot limits or filters on those may be cleared.</p><p>Built by <code>tools/unload_balancer.py</code> from a screenshot and checked in the Factorio Blueprint Editor. Not tested in the game.</p>",
    "blueprints": [
      {
        "label": "Balancer overlay",
        "string": "0eNrlms1u6zYQhV9F0KY/GAcmRUqkgdtFnqALd5VeBLLNxkJlyZDkpEGQdy9Ho9jBvZ5cTzYF6tVhJPHTcOKj+IR6SVf1Iey7qhnSxUtardumTxd3L2lfPTRljceachfSRVp21bDdhaFaz9btblU15dB26SukVbMJ/6QL9QpnZvVDCPVsvQ398O5a/foV0tAM1VAFut34w/N9c9itQhdh8AZYHeq/Z1XTh26IJyDdt32c1TZ4D7zrjYX0OV3Mb2zEb6ourOmsgTSuZeja+n4VtuVjFYuNU9ZVtz5Uw31oylUdNuli6A4BjofjlM0R/1fV9cP9aUnD8x4reqy64RCPHEukK2ZLXGAfEHH5pFucFPu5L7uxn4v0z4PWuU1fX7Gf37RFw7m+ftcU/a4pZyjZZRTzMcVcRsk/ptjLKO5jSn4ZRc0/xhQXYn7QX3ch5gcN9lIPqKvwgJrLTKDOd1cpmQs4jJbZgMNkMh9wGCM0AsexQidwnFxoBY5TSL2gr8MLTuYFzbTXy7zAYPRc5gUOo2Re4DBa6AWOkwm9wHGM0Ascx0q9kF3Hd6Nc5oWMaW8h8wKHcTIvcBgv8wKDyeZCL3AcJfQCx9FCL3CcTOoFcxVeyIzMC4Zpr5V5gcPkMi9wmELmBQ7jhF7gOF7oBYZj5kIvcBxxZrZX4QUjDM2Waa8wNXMYYWzmMMLczGGkwZnjSJMzx5FGZ44jzs7Ff++F2894YSnyghVm54L5p40wO3MYYXbmMMLszGGk2ZnjSLMzx5FmZ44jzs7uOrwgzM6Oaa8wOzOYXJidOYwwO3MYaXbmONLszHGk2ZnjiLOzvwov5MLs7Jn2CrMzhxFmZw4jzM4MppBmZ44jzc4cR5qdOY44O6v5VZihEIZnxe0mCdMzyxHGZ5YjzM8sRxqgWZA0QXMgJ43QLEicoZW6Ck84YYhWzEaOE6ZoliOM0SxHmKNZjjRIsyBpkmZB0ijNguT70PoqPOGlG9HMho6X7kRzHOlWNMeR7kVzHPFmNAcS70ZzIPF2NAc6ufT8a1FnPgTzkTi79DvUiXvyQf8JI4RyvX3nBXy/ayjxZa/4qWv3IX7QxyrSX+PM9jDsD7L/3p53hvtse1T2P2rPLdee0xN1FzbVYTcLdVxuF3u0b+vwfXey6eM4Y762qPn8k8Sx3/gyXjWEHT7hjy8DQlqXqxCXmf7R1G25qZqHZFXWZbMO3SLRyVP5EHsFyVPV4am2qZ/jnMfQ9eNdbK698d46kxcW/1rH68ZX/e40KFBzUF/hDgWUo3EU0Pk4RoHMjGMUMJrGeLmiyxWOPY09Ti1oaoFTLV1ucWo2jpGiiIICmipAAU0VoEBGFaCAoQqQooiCApoqQAFNFaBARhWggKEKkKKIggKaKkCBjCpAgYwqQAFDFSBFEQUFNFWAAhlVgAIZVYAChipAiiIKCmiqAAWyqZNYgaEKUMBMPcBLjr02x9bZYyfy48KKY52nuZ4OWkRaOowC+TRtnEdYFHBUjhvnUjkWV2VpVSiQExMFCioEBRwVigKeOmKRkxMHBXKqAQWKqbFYg6MaUMBTDRY5OXFQIKcaUKCYFjuulmpAAU81WOTkxEGBgmpAgYJqQAFHNaCAnz5eY1eJgwIF1YACBdWAAm767WINfvqFICcnDgoUVAMKOKoBBRzVgAKeasB2v/UN5a0PXp/W5bNTnd6c7uvtt5zJxKDBg8ajcaSKcYgC2o5jFMiycYwCRo1jFDA0FQUszUWBnOaiQEFzUcDRXBRw020LGH2GQxeH4+H4eNuEft1V++lh/ntdrkPSxodVMmxDEp/4eCLp2/HH8UtBn9RVE5LD/iZZtvvk7Utvn3SHJnnaVnVIlslvX5JbSFbtMLS7d5fQ6Vs8vUx+XkIcfknaLsRLEvx7Q8/On/rpTr/cxL8T/wI104oy"
      }
    ]
  },
  {
    "title": "Mining outpost: 28 drills on one yellow belt",
    "category": "Mining",
    "image": "custom/mining-outpost.webp",
    "stats": [
      "28 drills",
      "14 ore/s",
      "50 × 7 tiles",
      "2.5 MW"
    ],
    "desc": "<p>Two rows of electric mining drills facing a single belt. Each row fills one lane: 28 drills make 14 ore/s, 93% of a yellow belt.</p><p>Place it across the ore with the belt along the long side. Ore leaves at the east end. One medium pole every 7 tiles powers the four drills around it; connect any pole to your grid.</p><p>The 7 × 7 segment snaps to a grid, so you can drag it out to any length. It carries the pole on its left edge, so add one more pole after the last segment.</p><p>Built by <code>tools/mining_outpost.py</code> and checked in the Factorio Blueprint Editor. Not tested in the game.</p>",
    "blueprints": [
      {
        "label": "28 drills, belt out east",
        "string": "0eNqd2d9q2zAUBvBXMbpWsuifLQf6CLvbXQkjTbQicOxgO8tKyLtPsjdnlIidT1Bwq9RfjiX9iI9zY2/NxZ17345se2P+0LUD277e2ODf230Tx9r9ybEtc407jL0/rE6+9e376tj7pmF3znx7dL/YVtz5k7PGft8O564fV2+uGf/5d3nfceba0Y/eze84/fHxvb2c3lwf8ngig7NzN4TTuja+T4jarA1nH2yr1ibkH30fCp1e1bGkT7GSHCuQWEWOlUisJscqJNaQYzUSW5JjDRJbkWNLJNaSYysktibHWiRWbMi5NZRLdyYgaAKQBlETdGsCwibo2gTETdC9CQicoIsTEDlBNycgdIKuTkDsBN2dgOBJOjwByZN0eRL7iKPLk5A8CXzKQfIkXZ6E5Em6PAnJk3R5EpIn6fIkJE/S5UlInqTLk5A8RZcnIXmKLk9B8hRdnsJuL+nyFCRPAXeYkDxFl6cgeYouT0HyFF2eguQpujwFyVN0eQqSp+nyFCRP0+VpSJ6my9OQPE2Xp7HWji5PQ/I00N1B8jRdnobkabo8DcnTdHkakqfp8jQkz9DlaUieecg7uaO/nFbLA51z17j0U5Wwqe/P8h7gnj8ZSj74EJ/Ltc/iVW68SdSr0UAD1Wty41P1luB6Vf9ZrwotsIau3+bGp66/RgMFtMHKTXZ+ouISFbb0+oklK2FiSy9OmwKVnZ+aAhiZgHZZabLzUxWjzJaOObVosLOlo6VNgc3OT00BLE1C26zaZOcnKq5QaUvfmVi0Cpa29IW0KVDZ+akpgKUpaJtVJjs/VTEqbeneUosGS1u6K9oU2Oz81BTA0jS0zewmOz9RsUWlLT1QYtEsLG3pUWhToLLzU1MAS9PQNrMmOz9VMSpt6SSmRdtx5kd3Cmc/vhrmrNmHLiSMfZ1KK7rLGELGbSFtMZU58OLDNU13LWK3El8PJ/10/TC9jSllrevaWF1WJs7oNUxK/Nr3NfQlhoebXbPjr/HAw21U/D0eeDmPxwOv5vF44NU8Hg/czuPxwG0cD/Uf3XDo/Xm+RPbt2hV9dx2K7kfxdyaKeYr/1F50bfhxU+nrxyUVL4XQRde7L8Oa3e+/AaG6MkQ="
      },
      {
        "label": "Tileable 7×7 segment (4 drills)",
        "string": "0eNqd1N1qgzAUB/BXCedqA+2qNVqFPcLudjfGsHomgZhIkq4txXff0X5sDDtMQQRj8jv/kKNH2MgtdkYoB8URRKWVheLtCFY0qpTDmCpbhAJQYuWMqMJWKKGasDZCSugDEKrGPRRRH0yscqZUttPGhRuU7tf0uH8PAJUTTuCp4vhw+FDbdoOGvOCGEUCnLS3TaqhD1HLBAzhAsVpw8mthKOj4Nhki/WHj2Wzkw65ms7EPm8xmVz4sn80mPmw6m+U+bDabTX3Y9ZVtsRbbNrx2eKcl3m4zOsB+gsuD/7+Um40Q/Q27ntCj5b08n44bRb4g98ob38uPeenfIBy2tPrn9xSALOnYaexlhJjFpqWyLNtn7CFho2sfad4XGjvCPI3zJM/5OkkzulFqtJUR3aksvO40M3pnmf5kl5TslPKsMa3oQja024JdarBnFjNt8MkuqJpVZRc6HTZG1Oe9ZONOsr7vvwFKp8ba"
      }
    ]
  }
];
