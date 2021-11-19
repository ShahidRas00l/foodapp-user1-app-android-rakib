import React, { useEffect, useRef } from "react";
import { ScrollView, Text } from "react-native";

let scrollY = 0;

const TestComponent = (props) => {
  const scrollViewRef = useRef();

  const handleScroll = (event) => {
    const positionX = event.nativeEvent.contentOffset.x;
    const positionY = event.nativeEvent.contentOffset.y;
    // console.log(event, 10)
    // console.log('============================');
    // console.log(positionY)
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      // onScroll={handleScroll}
      onMomentumScrollEnd={(e) => {
        scrollY = e.nativeEvent.contentOffset.y;
        if (scrollY > 100) {
          console.log(scrollY);
        }
      }}
      /*onScrollEndDrag={e => {
          console.log(e.nativeEvent.contentOffset.y)
      }}*/
      onLayout={event => {
        const frameHeight = event.nativeEvent.layout.height;
        console.log("layout", frameHeight);
        // console.log('offset y', event.nativeEvent.contentOffset.y)
        /*const maxOffset = this.contentHeight - this.frameHeight;
        if (maxOffset < this.yOffset) {
            this.yOffset = maxOffset;
        }*/
      }}
      // scrollEventThrottle={16}
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias amet aperiam aspernatur beatae
        consectetur consequuntur cum dolore dolorum facere itaque laudantium maiores maxime nobis, obcaecati
        odit optio perferendis perspiciatis praesentium quaerat quam quo quod recusandae repellendus saepe
        sapiente similique temporibus unde, ut vel velit veritatis voluptatibus voluptatum? Cum dolorum illum
        reprehenderit sequi sit vitae voluptas. Adipisci commodi, dolorum esse incidunt ipsum labore minima,
        molestias nobis numquam officia sapiente sunt ullam unde ut veniam. Ad beatae blanditiis consectetur
        dignissimos, facere iure minus optio perferendis repudiandae saepe. Accusamus amet architecto beatae
        error, exercitationem ipsam iure non numquam placeat, possimus quam qui quod veritatis! Fugit ipsam
        labore maiores quidem quod similique sit voluptate? Atque consectetur fuga hic ipsum modi perferendis
        ratione. Eligendi nisi, vel! A ad aliquid dolores doloribus, ex fugit iste numquam perspiciatis possimus
        praesentium quia repudiandae sequi, tempore unde voluptas. A dicta iure maxime nam officiis omnis quo
        rerum sit. Accusantium alias, asperiores cum dignissimos itaque laboriosam magnam neque nostrum possimus
        quam qui quod rem repellat, reprehenderit sint suscipit voluptatem? Animi dolorum esse eveniet id porro.
        Doloremque excepturi nesciunt pariatur quia quisquam. A ab adipisci aliquid asperiores blanditiis
        ducimus eaque est eveniet, excepturi, fugiat harum inventore ipsa ipsam iste itaque labore laudantium
        minima molestias nobis officia officiis optio placeat provident sit vel velit vitae voluptatum. A
        architecto atque commodi cum dicta dolores est eveniet ex exercitationem explicabo, illum labore,
        officiis pariatur praesentium rerum ullam ut vitae voluptatem? Accusamus alias assumenda aut autem
        beatae commodi corporis, cupiditate dignissimos dolorem ducimus eligendi eveniet fuga, fugit incidunt
        libero molestias, natus non obcaecati officiis optio quis repellendus sint suscipit tempora temporibus
        ullam ut. Adipisci aliquid amet corporis debitis expedita inventore laudantium, minus odit, porro
        repudiandae soluta temporibus unde voluptatem? Amet aperiam distinctio doloremque dolores laboriosam
        maxime obcaecati? Ab aliquam assumenda dolores ea eaque esse fuga hic id incidunt iure libero magni
        maxime nesciunt odit pariatur quam quasi quisquam, rem sequi temporibus, totam ullam vel veritatis? At
        debitis delectus deleniti dolor enim exercitationem ipsam officia quidem quis sit ut vitae, voluptate
        voluptatem! Aperiam architecto consectetur culpa eius eligendi enim ex, illum iure mollitia
        necessitatibus nulla pariatur ratione saepe sit, tempora. Ad alias aperiam beatae consequuntur cumque
        dicta dolores dolorum enim eos explicabo hic impedit inventore, ipsam, iste laudantium nemo nulla odio
        officiis placeat possimus quam quia quisquam, suscipit ullam veniam veritatis voluptatem. At
        consequatur, cupiditate delectus dicta ea esse et excepturi explicabo facilis fugit hic iste iure modi
        molestiae neque, nisi perferendis, quaerat quasi qui quia quidem quod saepe sed similique vel vero
        voluptas voluptatem? Aliquam animi at autem corporis delectus deserunt dolor dolore dolorem earum, enim
        esse et eum excepturi expedita fuga fugiat hic laboriosam laborum libero, magni odio placeat praesentium
        quasi quidem quo reiciendis repellendus reprehenderit saepe suscipit ullam unde vel vero voluptatum!
        Asperiores dicta dolor enim id libero perferendis, quo soluta tenetur vero voluptatum. Aperiam culpa
        eligendi est nobis placeat? Debitis, distinctio enim excepturi harum inventore nemo obcaecati officiis
        praesentium reprehenderit sunt, suscipit voluptas? Accusamus adipisci amet cum debitis eos inventore
        iusto laborum minima, molestias necessitatibus quasi quod temporibus vel. Aliquid animi aperiam deserunt
        eaque, earum eius enim eveniet, expedita explicabo fugiat harum illo nobis numquam odit perspiciatis
        temporibus velit voluptatum. Accusantium ad, amet, aperiam assumenda dicta eum id ipsam magnam pariatur,
        quos soluta suscipit tempore ut. Cum nesciunt repudiandae rerum? Accusantium aperiam at culpa ducimus ea
        excepturi expedita facere facilis fugiat harum impedit maiores nam nostrum numquam optio, quo rem sequi
        ut veniam voluptates. Commodi dicta distinctio eaque eos excepturi id illo iure magnam magni, molestias
        neque nesciunt nisi odio omnis pariatur perferendis possimus quia repellat sapiente, suscipit tempora ut
        veniam voluptatibus? Ad amet assumenda dignissimos, dolor eaque eligendi eveniet ex hic incidunt
        laboriosam laborum modi, molestiae quibusdam ullam veritatis voluptates voluptatum. Accusantium alias,
        assumenda consectetur dicta et eum inventore libero, magnam modi nam necessitatibus nisi possimus quas
        quasi quod rem repellat sapiente sequi sunt suscipit totam, vero voluptate? Assumenda aut distinctio
        doloremque doloribus expedita libero maxime modi molestiae nisi, nobis provident quo quos sapiente vel
        velit vero voluptate? Accusamus autem deserunt ex explicabo facere, fuga in itaque, minus natus
        obcaecati officiis optio quidem reiciendis tenetur velit. Cum dolor eos impedit labore necessitatibus
        placeat sit ut. Architecto atque consequatur cupiditate debitis deserunt dolore dolorem, eaque ex
        excepturi, facere fuga fugiat, illo nam nemo odio optio repellendus rerum sit sunt tenetur unde velit
        veniam vero. A aliquid assumenda atque autem dolores, ducimus ea eius enim et eum excepturi fugiat fugit
        illo illum itaque laborum maxime minima molestias mollitia numquam odio quaerat quibusdam quidem
        recusandae saepe sequi sint sit tempora temporibus totam veniam voluptate voluptatem voluptatum! Ab
        animi cupiditate ducimus eaque error, illo iste itaque magni neque nisi, numquam, officia repellat sit.
        Facere illum ipsam labore libero magnam neque quae quibusdam ullam vero! A dignissimos eaque neque
        perspiciatis reiciendis? Accusamus adipisci animi cumque eum ex fuga fugit hic in, ipsa nostrum officiis
        optio perspiciatis possimus quam quisquam ratione recusandae rem rerum similique voluptas. Ab ad aliquam
        assumenda aut consectetur deleniti earum eligendi esse eveniet ex facere illum in inventore laboriosam
        laudantium molestiae nemo nobis, nostrum nulla officia, placeat porro possimus praesentium quam quas qui
        quidem reprehenderit repudiandae sint, temporibus totam veniam veritatis voluptates. Cupiditate dolor
        earum error laudantium maxime natus nemo odio sequi, voluptas voluptates. Aspernatur assumenda,
        blanditiis culpa est ex fugit porro quas ratione sit! Amet, aspernatur commodi dignissimos, doloribus
        dolorum eaque esse expedita hic laudantium non obcaecati odio porro quo sed sit ut velit voluptas,
        voluptates! Aliquam animi architecto deserunt esse itaque laborum nulla, obcaecati quae repudiandae sed
        similique soluta totam voluptate. Amet dolores ducimus eveniet excepturi in rem repellendus rerum sed
        temporibus unde. Accusantium adipisci aliquam, dicta dignissimos doloribus dolorum esse fugiat illo
        impedit in ipsa itaque laborum minima minus modi molestiae mollitia nisi officia officiis pariatur quas,
        reiciendis repudiandae rerum unde veritatis! Deleniti dolores eius possimus sequi voluptas! Aliquam at
        commodi consectetur corporis deserunt dolore dolores eius eum eveniet id in itaque libero maiores
        molestiae nisi pariatur possimus quae quasi quidem quis quo sapiente sed tempore ut vero, vitae?
      </Text>
    </ScrollView>
  );
};


export default TestComponent;
