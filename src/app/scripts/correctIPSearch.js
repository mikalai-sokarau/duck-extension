const correctIPSearch = () => {
  const IPSearchNodesArr = Array.from(
    document.querySelectorAll(".UserData a[href*='ripe.net']")
  );
  IPSearchNodesArr.forEach(node => {
    node.href = `https://www2.kufar.by/controlpanel?m=search&a=search&q=${
      node.innerHTML
    }&search_type=ip&queue=&region=&category_group=0&archive_group=noarchive&timespan=all&search=Search`;
  });
};

export default correctIPSearch;
