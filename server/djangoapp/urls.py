from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'
urlpatterns = [
    path(route='', view=views.index, name='index'),
    path(route='about/', view=views.about, name='about'),
    path(route='contact/', view=views.contact, name='contact'),
    path(route='register/', view=views.registration_request, name='register'),
    path(route='login/', view=views.login_request, name='login'),
    path(route='logout/', view=views.logout_request, name='logout'),
    path(route='dealerships/', view=views.get_dealerships, name='dealerships'),
    path(route='dealer/<int:dealer_id>/', view=views.get_dealer_details, name='dealer_details'),
    path(route='dealer/<int:dealer_id>/add_review/', view=views.add_review, name='add_review'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
