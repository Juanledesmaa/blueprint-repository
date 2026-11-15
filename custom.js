/* Custom tab: blueprints generated on request.
   Same shape as data.js, plus `stats` (short facts shown as pills) and a picture stored in custom/.
   Each blueprint is built by a script in tools/, checked there, and rendered in the
   Factorio Blueprint Editor (fbe.factorygamefan.com). Newest first. */
const CUSTOM_BLUEPRINTS = [
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
