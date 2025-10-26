import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // rola pro topo suave a cada troca de rota
    window.scrollTo({ top: 0, behavior: "smooth" });
    // fecha o menu mobile se estiver aberto (Bootstrap 5)
    const offcanvas = document.querySelector(".navbar .collapse.show");
    if (offcanvas) {
      const bsCollapse = window.bootstrap?.Collapse.getInstance(offcanvas);
      if (bsCollapse) bsCollapse.hide();
      else offcanvas.classList.remove("show");
    }
  }, [pathname]);

  return null;
}
