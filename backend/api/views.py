import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .mocks import *

def _get_next_id(resource_list):
    if resource_list:
        return max(item["id"] for item in resource_list) + 1
    return 1

def _handle_get_post(resource_list, required_fields=None):
    @csrf_exempt
    def view(request):
        if request.method == 'GET':
            return JsonResponse(resource_list, safe=False)
        elif request.method == 'POST':
            try:
                data = json.loads(request.body)
                if required_fields:
                    for field in required_fields:
                        if field not in data:
                            return JsonResponse({"error": f"Missing field: {field}"}, status=400)
                data["id"] = _get_next_id(resource_list)
                resource_list.append(data)
                return JsonResponse(data, status=201)
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)
        else:
            return JsonResponse({"error": "Method not allowed"}, status=405)
    return view

users = _handle_get_post(USERS, required_fields=["name", "email"])
products = _handle_get_post(PRODUCTS, required_fields=["name", "price"])
orders = _handle_get_post(ORDERS, required_fields=["productId", "quantity"])
inventory = _handle_get_post(INVENTORY, required_fields=["productId", "stock"])
customers = _handle_get_post(CUSTOMERS, required_fields=["name", "email"])
suppliers = _handle_get_post(SUPPLIERS, required_fields=["name", "contact"])
invoices = _handle_get_post(INVOICES, required_fields=["orderId", "amount"])
payments = _handle_get_post(PAYMENTS, required_fields=["invoiceId", "amount", "method"])
tickets = _handle_get_post(TICKETS, required_fields=["customerId", "issue"])
notifications = _handle_get_post(NOTIFICATIONS, required_fields=["userId", "message"])
